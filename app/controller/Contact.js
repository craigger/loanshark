/*
 * File: app/controller/Contact.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Payback.controller.Contact', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'PeopleStore'
        ],
        views: [
            'ContactDetail'
        ],

        routes: {
            '/Prey/:id': 'showContactDetail'
        },

        refs: {
            ContactDetail: {
                autoCreate: true,
                selector: 'ContactDetail',
                xtype: 'ContactDetail'
            },
            myContactDataView: '#myContactDataView',
            myDebtDataView: '#myDebtDataView',
            contactHeaderLabel: '#contactHeaderLabel',
            loanHistoryLabel: '#loanHistoryLabel',
            addContactButton: '#addContact',
            MainView: 'MainView'
        },

        control: {
            "#addContact": {
                tap: 'onAddContactTap'
            },
            "#saveContact": {
                tap: 'onSaveContactTap'
            },
            "#cancelContact": {
                tap: 'onCancelContactTap'
            },
            "#myContactDataView": {
                itemswipe: 'onDataviewItemSwipe',
                itemtap: 'onDataviewItemTap'
            }
        }
    },

    onAddContactTap: function(button, e, options) {

        var form = this.getContactDetail();
        form.reset(); //clear form
        form.setRecord(null); //clear record from form

        //clears filter placed on Debt store
        Ext.getStore('Debts').clearFilter();

        //hides buttons and debt data view on new contacts
        form.down('#addDebt').hide();
        form.down('dataview').hide();
        this.getContactHeaderLabel().hide();
        this.getLoanHistoryLabel().hide();

        //update url
        this.getApplication().getHistory().add(new Ext.app.Action({
            url: '/Prey/add'
        }), true);

        //set active item
        Ext.Viewport.setActiveItem(this.getContactDetail());
    },

    onSaveContactTap: function(button, e, options) {
        var form = this.getContactDetail(),
            record = form.getRecord(),
            values = form.getValues();

        if(record) { //if editing record
            record.set(values);
            record.save();

        } else { //if new record

            record = Ext.create('Payback.model.Person',values);

            Ext.getStore('People').add(record);
            Ext.getStore('People').sync();
        }

        //update summary
        this.getApplication().getController('Summary').updateSummary();

        //clear form
        this.getContactDetail().reset();

        //refresh debt panel dataview with any new data
        this.getMainView().getInnerItems()[1].down('dataview').refresh();

        //update url
        this.getApplication().getHistory().add(new Ext.app.Action({
            url: '/Prey'
        }), true);

        //set active item
        Ext.Viewport.setActiveItem(0);
    },

    onCancelContactTap: function(button, e, options) {
        //delete form
        this.getContactDetail().reset();

        //update url
        this.getApplication().getHistory().add(new Ext.app.Action({
            url: '/Prey'
        }), true);

        //set active item
        Ext.Viewport.setActiveItem(0);
    },

    onDataviewItemSwipe: function(dataview, index, target, record, e, options) {
        var deleteButtons = dataview.query('button');

        //hide other delete buttons
        for (var i=0; i < deleteButtons.length; i++) {
            deleteButtons[i].hide();
        }

        var labels = Ext.select(target.getObservableId() +' .money-label');
        labels.hide();

        //show item delete button
        target.query('button')[0].show();

        //hides delete button if anywhere else is tapped
        Ext.Viewport.element.on({tap:function(){
            target.query('button')[0].hide();
            labels.show();
        }, single:true});
    },

    onDataviewItemTap: function(dataview, index, target, record, e, options) {
        var form = this.getContactDetail(),
            debtDataView = this.getMyDebtDataView();

        //set the record for the form
        form.setRecord(record);

        //clears filter on store and sets a new one, this shows only the payments associated with the debt tapped
        Ext.getStore('Debts').clearFilter();
        Ext.getStore('Debts').filter("person_id", record.get('id'));

        //refresh DataView
        debtDataView.refresh();

        //update header
        var header = this.getContactHeaderLabel();
        header.setHtml(record.get('name'));

        //show items if hidden
        debtDataView.show();
        form.down('#addDebt').show();
        this.getContactHeaderLabel().show();
        this.getLoanHistoryLabel().show();

        //scroll to top
        this.getContactDetail().getScrollable().getScroller().scrollToTop();

        //update url
        this.getApplication().getHistory().add(new Ext.app.Action({
            url: '/Prey/'+(index+1)
        }), true);

        //set active item
        Ext.Viewport.setActiveItem(form);

        //set headerLabel font size, this needs to be set after the active item is set
        var fontSize = 75;
        var maxHeight = header.getHeight();
        var maxWidth = Ext.Viewport.getWindowWidth()-20;
        var textHeight;
        var textWidth;
        do {
            header.setStyle({'font-size': fontSize+'px'});
            textHeight = header.innerHtmlElement.getHeight();
            textWidth = header.innerHtmlElement.getWidth();
            fontSize = fontSize - 1;
        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
        header.setStyle({'padding-top': (100-textHeight)/2+'px'}); //center text
    },

    showContactDetail: function(id) {

        this.getMainView().setActiveItem(2);

        if(id=="add") {
            this.getAddContactButton().onTap();
        } else {

            id--;
            var dataView = this.getMyContactDataView();
            var dataItem = dataView.getItems().getAt(0).getInnerItems()[id];

            if(dataItem) {
                this.onDataviewItemTap(dataView,id,null, dataItem.getRecord());  
            }
        }
    }

});