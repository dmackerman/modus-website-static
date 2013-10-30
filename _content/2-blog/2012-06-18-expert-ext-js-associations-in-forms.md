---
author: aaron
comments: true



title: 'Expert Ext JS: Associations in Forms'

categories:
    - Development
    - Associations
    - DataView
    - ExtJS
    - Forms
---

Associations were a major addition to the data package in Ext JS 4 and, to me at least, appeared to be a great answer to problems I had faced repeatedly. Unfortunately, I found them less useful in practice than on paper and they seem to be a source of confusion for many developers. However, when creating my [Form Panel extension](http://moduscreate.com/expert-ext-js-model-integration-in-forms/) I realized a very natural use case.

How often have you seen an API that delivers data like this:

    
    {
        id: 1234,
        name: 'Aaron Smith',
        dob: '5/1/1900',
        addresses: [
             {
                 address1: '1925 Isaac Newton Square',
                 address2: 'Suite 300',
                 city: 'Reston',
                 state: 'VA',
                 zip: 12345
             }
        ]
    }


Obviously you could just treat addresses as a complex object and create a custom form component for it. But this is liable to require a lot of custom/concrete/boilerplate code each time you encounter a different entity within an array. My solution is to use the HasMany Association with a custom DataView-based form field. It also requires an update to my Form Panel extension. This is assuredly not the lightest solution possible. But it is elegant and convenient, allowing you to do more by configuration and less by custom, concrete code. Furthermore, it allows you to treat all components of your form as proper form fields.

Below are the model definitions for the above response:

    
    Ext.define('Address', {
        extend: 'Ext.data.Model',
        fields: ['address1', 'address2', 'city', 'state', 'zip']
    });
    
    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: ['id', 'name', 'dob'],
        hasMany: [{ name: 'addresses', model: 'Address' }]
    });


Now for our custom DataViewField. This is a pretty straightforward but a little more work than I had hoped. I was not pleased with having to listen to so many events on the store, but datachanged didn't fire in every situation I needed. I only included the structural store/dataview/field contents. In practice you'll find two basic use cases for creating, updating and destroying that require some easily abstracted code. After creating these abstractions, this class would only be directly extended in fringe cases.

    
    Ext.define('MC.form.field.DataViewField', {
        extend: 'Ext.view.View',
        xtype: 'dataviewfield',
        mixins: {
            field: 'Ext.form.field.Field'
        },
    
        initComponent: function() {
            this.callParent();
            this.initField();
            this.on('itemclick', this.onRowClick, this);
        },
    
        isEqual: function(value1, value2) {
            return (Ext.encode(value1) === Ext.encode(value2));
        },
    
        bindStore: function(store) {
            var hadStore = false;
    
            if (this.store) {
                this.store.un('datachanged', this.onStoreChange, this);
                this.store.un('update', this.onStoreChange, this);
                this.store.un('add', this.onStoreChange, this);
                this.store.un('remove', this.onStoreChange, this);
                hadStore = true;
            }
            this.callParent(arguments);
    
            if (store !== null) {
                this.value = this.calculateValue();
                this.initValue();
    
                this.store.on('datachanged', this.onStoreChange, this);
                this.store.on('update', this.onStoreChange, this);
                this.store.on('add', this.onStoreChange, this);
                this.store.on('remove', this.onStoreChange, this);
    
                if (hadStore) {
                    this.fireEvent('dirtychange', this, false);
                }
            }
        },
    
        getName: function() {
            return this.name;
        },
    
        reset: function() {
            if (this.store) {
                this.store.rejectChanges();
            }
            this.refresh();
        },
    
        calculateValue: function() {
            var values = [], r, rLen, record, value, c, cLen, fieldName;
    
            for (r=0, rLen=this.store.getCount(); r<rLen; r++) {
                record = this.store.getAt(r);
                value = {};
                for (c=0, cLen=record.fields.getCount(); c<cLen; c++) {
                    fieldName = record.fields.getAt(c).name;
                    value[fieldName] = record.get(fieldName);
                }
                values[r] = value;
            }
    
            return values;
        },
    
        onStoreChange: function() {
            this.setValue(this.calculateValue());
        }
    });


Below are the changes required to the ModelFormPanel to support fields representing associated data:

    
    Ext.define('MC.form.Panel', {
        extend: 'Ext.form.Panel',
    
        //...
    
        /* Note this takes the place of what used to be bindModel() - based on @themightychris's simplification suggestion */
        loadRecord: function(model) {
            var i, len, associations = model.associations.items, name, field;
    
            this.callParent(arguments);
    
            // loadRecord() won't include associated data, so let's do that.
            for (i=0, len=associations.length; i<len; i++) {
                name = associations[i].name;
                field = this.down('[name='+name+']');
                if (field && field.isFormField && field.bindStore) {
                    field.bindStore(model[name]());
                }
            }
        },
    
        //...


Here's an example of DataViewField in use. AddressFormWindow is simply an Ext Window with a Form in it corresponding to the (editable) fields defined in the Model. The Form Panel should be my [Model Form Panel](http://moduscreate.com/expert-ext-js-model-integration-in-forms/).

    
    Ext.define('AddressesField', {
        extend: 'MC.form.field.DataViewField',
        xtype: 'addressesfield',
    
        requires: ['AddressFormWindow'],
    
        addIconCls: 'add-icon',
        editIconCls: 'edit-icon',
        deleteIconCls: 'delete-icon',
        itemSelector: 'div.address-row',
    
        addressFormWindow: null,
    
        initComponent: function() {
            this.tpl = new Ext.XTemplate(
                '<label>', this.fieldLabel, '</label>',
                '<div class="add-icon"/>',
                '<div class="addresses">',
                    '<tpl for=".">',
                        '<div class="address-row">',
                            '<div class="address">',
                                '<div>{address1}</div>',
                                '{[values.address2 ? "<div>" + values.address2 + "</div>" : ""]}',
                                '<div>{city}, {state} {zip}</div>',
                            '</div>',
                            '<div class="icons">',
                                '<div class="edit-icon"/>',
                                '<div class="delete-icon"/>',
                            '</div>',
                        '</div>',
                    '</tpl>',
                '</div>'
            );
    
            this.callParent();
    
            this.on('itemclick', this.onRowClick, this);
        },
    
        destroy: function() {
            if (this.addressFormWindow) {
                this.killForm();
            }
            this.callParent(arguments);
        },
    
        onRender: function() {
            this.callParent(arguments);
    
            this.el.on({
                click: this.onAddClick,
                scope: this,
                delegate: 'div.add-icon'
            });
        },
    
        onAddClick: function() {
            this.addressFormWindow = Ext.create('AddressFormWindow', {
                addMode: true,
                listeners: {
                    submit: this.onAddAddress,
                    cancel: this.onAddressFormCancel,
                    scope: this
                }
            });
            this.addressFormWindow.show();
        },
    
        onRowClick: function(view, record, item, index, e) {
            var targetCls = e.getTarget().className;
            if (targetCls === this.editIconCls) {
                this.onEditClick(view, record);
            } else if (targetCls === this.deleteIconCls) {
                this.onDeleteClick(view, record);
            }
        },
    
        onEditClick: function(view, model) {
            model.beginEdit();
            this.addressFormWindow = Ext.create('AddressFormWindow', {
                addMode: false,
                model: model,
                listeners: {
                    submit: this.onEditAddress,
                    cancel: this.onAddressFormCancel,
                    scope: this
                }
            });
            this.addressFormWindow.show();
        },
    
        onDeleteClick: function(view, model) {
            this.store.remove(model);
            this.refresh();
        },
    
        onAddressFormCancel: function() {
            this.killForm();
        },
    
        onAddAddress: function(form, model) {
            this.store.add(model);
            this.killForm();
            this.refresh();
        },
    
        onEditAddress: function(form, model) {
            model.endEdit();
            this.killForm();
        },
    
        killForm: function() {
            this.addressFormWindow.destroy();
            this.addressFormWindow = null;
        }
    });
    
    Ext.create('MC.form.ModelFormPanel', {
        model: 'User',
        items: [
             {
                 xtype: 'textfield',
                 name: 'name',
                 fieldLabel: 'Name'
             },
             {
                 xtype: 'datefield',
                 name: 'dob',
                 fieldLabel: 'Date of Birth'
             },
             {
                 xtype: 'addressfield',
                 name: 'addresses',
                 fieldLabel: 'Addresses'
             }
        ]
    });


As you can see, much of contents here could be made into an abstract class, which would be used whenever a popup form is desired for adding or editing records. In the [Modus Create Sencha Plugin Pack](https://github.com/ModusCreateOrg/modus-create-sencha-plugin-pack), I have included a component that does just this: [PopupEditorDataViewField](https://github.com/ModusCreateOrg/modus-create-sencha-plugin-pack/blob/master/MC/form/field/PopupEditorDataViewField.js).

Next week, we'll discuss reading and writing nested JSON data.
