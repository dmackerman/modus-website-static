---
author: aaron
comments: true



title: 'Expert Ext JS: Model Integration in Forms'

categories:
- Development
- ExtJS
- Forms
---

_The Expert Ext JS series details tips and tricks for making the most out of Ext JS. All custom components mentioned are included in Modus Create's Sencha Plugin Pack available on [GitHub](https://github.com/ModusCreateOrg/modus-create-sencha-plugin-pack)._

In Ext JS 4, the data package received a lot of attention and the improvements made were, for the most part, quite impressive. However, the interplay between models and forms remains lackluster. Many folks building a full Ext JS app are not likely to use normal form submission, so getting forms to play nice with models can have significant benefits. With models truly bound to forms, performing normal create, read and update operations can easily take advantage of Proxies, Readers and Writers through Model's clean API. As it turns out, it's as easy as this:


    
    
    Ext.define('MC.form.Panel', {
        extend: 'Ext.form.Panel',
    
        /**
         * Can be a reference to a model instance or a model class name.
         */
        model: null,
        /**
         * Set to the id of the model instance and the model will be loaded for you.
         * Only applicable if model provided is a model class name (string).
         */
        modelId: null,
    
        initComponent: function() {
    
            this.callParent();
    
            this.getForm().trackResetOnLoad = true; //Workaround
    
            if (Ext.isString(this.model)) {
    
                //Load a model to be updated
                if (this.modelId) {
    
                    Ext.ClassManager.get(this.model).load(this.modelId, {
                        failure: this.onModelLoadFailure,
                        success: this.onModelLoadSuccess,
                        scope: this
                    });
    
                //Load an empty record to be inserted
                } else {
                    this.bindModel(Ext.create(this.model, {}));
                }
    
            } else {
    
                //Bind the provided model to be updated
                this.bindModel(this.model);
    
            }
    
            this.addEvents('loadsuccess', 'loadfailure', 'savesuccess', 'savefailure');
        },
    
        bindModel: function(model) {
            this.model = model;
            this.loadRecord(model);
        },
    
        commit: function(callback, scope) {
            if (this.form.isDirty()) {
                this.form.updateRecord(this.model);
    
                this.model.save({
                    callback: function(records, operation) {
                        if (operation.wasSuccessful()) {
                            this.fireEvent('savesuccess', this, records, operation);
                        } else {
                            this.fireEvent('savefailure', this, records, operation);
                        }
                        if (callback) {
                            callback.call(scope || this, this, operation.wasSuccessful(), this.model);
                        }
                    },
                    scope: this
                });
            }
        },
    
        onModelLoadSuccess: function(record, operation) {
            this.bindModel(record);
            this.fireEvent('loadsuccess', this, record, operation);
        },
    
        onModelLoadFailure: function(record, operation) {
            this.fireEvent('loadfailure', this, record, operation);
        }
    
    });
    



As you can see FormPanel and BasicForm provide most of the needed logic with loadRecord() and updateRecord() and it's just a little extra legwork to simplify model integration. 

One issue I identified was that trackResetOnLoad was not propagated down to BasicForm as promised in the docs, which is why that's noted in my comment above.

Now let's take a look at how we can use this with a concrete example:


    
    
    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: ['id', 'name', 'email', 'dob'],
        proxy: {
            type: 'rest',
            api: {
                create: '/user/create',
                read: '/user/read',
                up
            }
        }
    });
    
    Ext.define('UserForm', {
        extend: 'MC.form.Panel',
    
        model: 'User',
    
        initComponent: function() {
            this.items = [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email Address',
                    name: 'email'
                },
                {
                    xtype: 'textfield',         
                    fieldLabel: 'Name',
                    name: 'name'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date of Birth',
                    name: 'dob'
                },
                {
                    xtype: 'button',
                    text: 'Submit',
                    handler: this.commit,
                    scope: this
                }
            ];
            this.callParent();
        }
    });
    
    
    //Create a new user
    var newUserForm = Ext.create('UserForm'); //will create a phantom model
    
    //Modify an existing user for which you only have the id
    var newUserForm = Ext.create('UserForm', { modelId: 1234 });
    
    //Modify an existing user for which you have an existing model
    var user = Ext.create('User', { id: 1234, name: 'Aaron Smith' });
    var existingUserForm = Ext.create('UserForm', { model: user });
    



Next week, we'll discuss using this Form Panel with Associations!
