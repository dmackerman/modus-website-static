---
author: jay
comments: true



title: Abstract classes with Ext JS

categories:
- Development
---





[Ext JS Screencast: Abstract Classes](http://vimeo.com/12017473) from [Jay Garcia](http://vimeo.com/tdgi) on [Vimeo](http://vimeo.com).





In this screencast, we discuss the basics of Abstract classes and how they can help you design maintainable and extensible code.





* * *





Here is the code from the screencast:
**AbstractFormPanel.js**




    
    
    Ext.ns('MyApp');
    
    MyApp.AbstractFormPanel = Ext.extend(Ext.form.FormPanel, {
        defaultType : 'textfield',
        frame       : true,
        width       : 300,
        height      : 200,
        labelWidth  : 75,
        submitUrl   : null,
        initComponent : function() {
             Ext.apply(this, {
                items    : this.buildItems(),
                buttons  : this.buildButtons(),
                defaults : {
                    anchor : '-10'
                }
             });
    
             MyApp.AbstractFormPanel.superclass.initComponent.call(this);
        },
        buildItems : function() {
            return [];
        },
        buildButtons : function() {
            return [
                {
                    text    : 'Submit',
                    scope   : this,
                    handler : this.onSubmit
                },
                {
                    text    : 'Cancel',
                    scope   : this,
                    handler : this.onCancel
                }
            ];
        },
        onSubmit : function() {
            Ext.MessageBox.alert('Submit', this.submitUrl);    
        },
        onCancel : function() {
            this.el.mask('This form is canceled');
        }
    });
    





  
**NameFormPanel.js**




    
    
    Ext.ns('MyApp');
    
    MyApp.NameFormPanel = Ext.extend(MyApp.AbstractFormPanel, {
        title      : 'Edit name data',
        submitUrl  : 'nameAction.asp',
        buildItems : function() {
            return [
                {
                    name       : 'firstName',
                    fieldLabel : 'First Name'
                },
                {
                    name       : 'lastName',
                    fieldLabel : 'Last Name'
                },
                {
                    name       : 'middleName',
                    fieldLabel : 'Middle Name'
                },
                {
                    xtype      : 'datefield',
                    name       : 'dob',
                    fieldLabel : 'DOB'
                }
            ];
        },
        //Extension
        buildButtons : function() {
            var btns = MyApp.NameFormPanel.superclass.buildButtons.call(this);
    
            btns[0].text = "OK";
            btns[0].handler = this.onOkBtn;
            return btns;
        },
        //Override
        onOkBtn : function() {
            console.info('OK btn pressed');        
        }
       
    });





<br/>**AddressFormPanel.js**




    
    Ext.ns('MyApp');
    
    MyApp.AddressFormPanel = Ext.extend(MyApp.AbstractFormPanel, {
        title      : 'Edit address data',
        submitUrl  : 'addressAction.asp',
        buildItems : function() {
            return [
                {
                    name       : 'address1',
                    fieldLabel : 'Address 1'
                },
                {
                    name       : 'address2',
                    fieldLabel : 'Address 2'
                },
                {
                    name       : 'city',
                    fieldLabel : 'city'
                },
                {
                    xtype      : 'combo',
                    name       : 'state',
                    fieldLabel : 'State',
                    store      : ['MD', 'VA', 'DC']
                },
                {
                    xtype      : 'numberfield',
                    name       : 'zip',
                    fieldLabel : 'Zip Code'
                }
            ];
        }
    
    
    });





[donation-can Macpro]



