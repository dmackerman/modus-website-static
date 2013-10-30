---
author: aaron
comments: true



title: 'Expert Ext JS: Reading and Writing Structured Data'

categories:
- Development
- Associations
- ExtJS
- JSON
---

_The Expert Ext JS series details tips and tricks for making the most out of Ext JS. All custom components mentioned are included in Modus Create's Sencha Plugin Pack available on [GitHub](https://github.com/ModusCreateOrg/modus-create-sencha-plugin-pack)._

Often times front-end developers don't have the option to change server-side behavior. This can be highly frustrating. I'll discuss a few scenarios which Ext JS does not handle, but can be achieved with some relatively simple extensions.



## Reading Optional Nested Data



Let's say you have data like this:


    
    
    {
        id: 1234,
        name: 'Aaron Smith',
        address: {
            address1: '1925 Isaac Newton Sq',
            address2: 'Suite 300',
            city: 'Reston',
            state: 'VA',
            zip: 20190
        }
    }
    



Your corresponding Model definition would look like so:


    
    
    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [
            'id', 
            'name',
            { name: 'address1', mapping: 'address.address1' },
            { name: 'address2', mapping: 'address.address2' },
            { name: 'city', mapping: 'address.city' },
            { name: 'state', mapping: 'address.state' },
            { name: 'zip', mapping: 'address.zip' }
        ]
    });
    



But what if address isn't provided on all read requests? Ext JS's [JsonReader](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.reader.Json) chokes. Here's a JsonReader extension that will traverse mappings safely:


    
    
    Ext.define('MC.data.JsonReader', {
        extend: 'Ext.data.reader.Json',
        alias: 'reader.json',
    
        safeMappings: false,
    
        createFieldAccessExpression: (function() {
            var re = /[\[\.]/;
    
            return function(field, fieldVarName, dataName) {
                var hasMap = (field.mapping !== null),
                    map    = hasMap ? field.mapping : field.name,
                    result,
                    operatorSearch,
                    mapFields, mapResult, i, len, value;
    
                if (typeof map === 'function') {
                    result = fieldVarName + '.mapping(' + dataName + ', this)';
                } else if (this.useSimpleAccessors === true || ((operatorSearch = String(map).search(re)) < 0)) {
                    if (!hasMap || isNaN(map)) {
                        // If we don't provide a mapping, we may have a field name that is numeric
                        map = '"' + map + '"';
                    }
                    result = dataName + "[" + map + "]";
                } else if (this.safeMappings && operatorSearch > 0) {
                    mapFields = map.split('.');
                    mapResult = [];
                    for (i=0, len=mapFields.length-1; i<len; i++) {
                         mapResult[i] = dataName + '.' + mapFields.slice(0, i+1).join('.');
                    }
                    value = dataName + '.' + mapFields.slice(0, i+1).join('.');
                    result = '(' + (mapResult.join(' && ') + ' ? ' + value + ' : ' + 'undefined' ) + ')';
                } else {
                    result = dataName + (operatorSearch > 0 ? '.' : '') + map;
                }
                return result;
            };
        }())
    
    });
    



To minimize performance impact, safe mapping traversal is not enabled by default. For any Models that require this, simply configure the corresponding reader as such:


    
    
    reader: {
        type: 'json',
        safeMappings: true
    }
    





## Writing Structured Data



Let's say you need to write back data using the same format in which it is provided in a read operation. As you may know, the default [JsonWriter](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.writer.Json) does not use mappings to structure the data for writes and instead sends only key-value pairs. While it would be tempting to write a simple JsonWriter extension to achieve this. I believe this approach is shortsighted. It makes more sense to place this functionality on the Model prototype so that any obscure boundary cases can be handled with custom code that is easily isolated in the particular Model(s).

In order to achieve this, we need two extensions. First, we'll extend Ext.data.Model to take an instance's values and construct the payload:


    
    
    Ext.define('MC.data.Model', {
        extend: 'Ext.data.Model',
    
        writeStructuredData: true,
    
        getWriteData: function() {
            var isPhantom = record.phantom === true,
                writeAllFields = this.writeAllFields,
                fields = this.fields,
                fieldItems = fields.items,
                data = {},
                changes = this.getChanges(),
                field,
                key,
                f, fLen;
    
            for (f=0, fLen=fieldItems.length; f<fLen; f++) {
                field = fieldItems[f];
    
                if (field.persist && (writeAllFields || isPhantom)) {
                    this.setFieldWriteData(data, this, field, this.get(field.name);
                }
            }
    
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    if (field.persist) {
                        this.setFieldWriteData(data, this, field, changes[key]);
                    }
                }
            }
    
            return data;
        },
    
        setFieldWriteData: function(data, record, field, value) {
            var name = field[this.nameProperty] || field.name,
                path, i, len, curr;
    
            if (field.name === record.idProperty && record.phantom) {
                return;
            }
    
            if (field.mapping) {
                if (field.mapping.indexOf('.')) {
                    path = field.mapping.split('.');
                    curr = data;
                    for (i=0, len=path.length-1; i<len; i++) {
                        if (!curr[path[i]]) {
                            curr[path[i]] = {};
                        }
                        curr = curr[path[i]];
                    }
                    curr[path[i]] = value;
                }
            } else {
                data[name] = value;
            }
        }
    });
    



Next, we'll extend Ext.data.writer.Json to use Model's getWriteData() when writeStructuredData is true. Note that this will not break down even if MC.data.Model is not used.


    
    
    Ext.define('MC.data.JsonWriter', {
        extend: 'Ext.data.writer.Json',
        alias: 'writer.json',
    
        getRecordData: function(record, operation) {
            if (record.writeStructuredData) {
                return record.getWriteData();
            } else {
                return this.callParent(arguments);
            }
        }
    });
    





## Writing Associated Data



One oddity I found is that there was no way to write up associated data with the owning Model. This can easily be incorporated into the Model extension I provided above. We just need to restructure it so the getWriteData() method looks at the current record and any associated records. This is what it looks like. 


    
    
    Ext.define('MC.data.Model', {
        extend: 'Ext.data.Model',
    
        writeStructuredData: true,
    
        getWriteData: function() {
            var data = this.getRecordWriteData(this),
                associations = this.associations.items,
                association, type, name, associatedStore, 
                associatedRecords, associatedRecord,
                a, aLen, r, rLen;
    
            for (a=0, aLen=associations.length; a<aLen; a++) {
    
                association = associations[a];
                type = association.type;
                name = association.name;
    
                if (type == 'hasMany') {
    
                    associatedStore = this[association.storeName];
                    // Initialize the array for this association
                    data[name] = [];
    
                    // If the association's loaded, process its records
                    if (associatedStore && associatedStore.getCount() > 0) {
                        associatedRecords = associatedStore.data.items;
    
                        // Append data for each record
                        for (r=0, rLen=associatedRecords.length; r<rLen; r++) {
                            data[name][r] = this.getRecordWriteData(associatedRecords[r]);
                        }
                    }
    
                } else if (type == 'hasOne') {
                    associatedRecord = this[association.instanceName];
                    // If the record exists, append its data
                    if (associatedRecord !== undefined) {
                        data[name] = this.getRecordWriteData(associatedRecord);
                    }
                }
    
            }
    
            return data;
        },
    
        getRecordWriteData: function(record) {
            var isPhantom = record.phantom === true,
                writeAllFields = record.writeAllFields,
                fields = record.fields,
                fieldItems = fields.items,
                data = {},
                changes = record.getChanges(),
                field,
                key,
                f, fLen;
    
            for (f=0, fLen=fieldItems.length; f<fLen; f++) {
                field = fieldItems[f];
    
                if (field.forcePersist || (field.persist && (writeAllFields || isPhantom))) {
                    this.setFieldWriteData(data, record, field, record.get(field.name);
                }
            }
    
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    if (field.persist) {
                        this.setFieldWriteData(data, record, field, changes[key]);
                    }
                }
            }
    
            return data;
        },
    
        setFieldWriteData: function(data, record, field, value) {
            var name = field[this.nameProperty] || field.name,
                path, i, len, curr;
    
            if (field.name === record.idProperty && record.phantom) {
                return;
            }
    
            if (field.mapping) {
                if (field.mapping.indexOf('.')) {
                    path = field.mapping.split('.');
                    curr = data;
                    for (i=0, len=path.length-1; i<len; i++) {
                        if (!curr[path[i]]) {
                            curr[path[i]] = {};
                        }
                        curr = curr[path[i]];
                    }
                    curr[path[i]] = value;
                }
            } else {
                data[name] = value;
            }
        }
    
    });
    



One thing I added here was to allow you to specify a forcePersist property on any Field to make sure it is persisted whether it has changed or not. It is also worth noting that if you need to write associated Models with a different key than they are read you simply can use [associationKey](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.association.Association-cfg-associationKey)

Next up we'll talk about left/right docked TabBars!
