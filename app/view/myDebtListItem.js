/*
 * File: app/view/myDebtListItem.js
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

Ext.define('Payback.view.myDebtListItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.myDebtListItem',

    config: {
        baseCls: 'x-data-item',
        cls: [
            'x-list-item'
        ],
        items: [
            {
                xtype: 'container',
                baseCls: 'x-list-item-label',
                itemId: 'debtListItemDetail',
                tpl: [
                    '<div>   ',
                    '<div>',
                    '<span style=\'color:#777\'>{[Ext.Date.format(values.date,\'m/d\')]}</span>&nbsp;&nbsp;&nbsp;',
                    '<span class=\'debt-person-label\'><tpl for="Person">{name}</tpl></span>',
                    '<b class=\'money-label\' style=\'float: right;color:red;font-size: .9em;\'> Loan: {[(values.amount<0)?\'-\':\'\']}${[Math.abs(values.amount).toFixed(2)]}</b>',
                    '</div>',
                    '<div>',
                    '<span style=\'color:#ddd\'>{reason}</span>',
                    '',
                    '<b class=\'money-label\' style=\'float: right;color:orange;clear:both;\'>Balance: {[(values.balance<0)?\'-\':\'\']}${[Math.abs(values.balance).toFixed(2)]}</b>',
                    '</div>',
                    '</div>'
                ],
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        docked: 'right',
                        hidden: true,
                        itemId: 'deleteDebt',
                        margin: '0 0 0 10px',
                        maxHeight: '',
                        iconCls: 'icon-delete',
                        iconMask: true,
                        text: 'delete'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onDebtDeleteButtonTap',
                event: 'tap',
                delegate: '#deleteDebt'
            }
        ]
    },

    onDebtDeleteButtonTap: function(button, e, options) {

        //stops propagation of event, without this sometimes both the itemtap 
        //and deletebuttontap would get fired after a previous record is deleted in dataview
        e.stopEvent(); 

        var dataview = this.up('dataview');
        var debt = this.getRecord();

        //remove payments from debt
        var payments = debt.payments();
        var paymentStore = Ext.getStore('Payments');
        paymentStore.remove(payments.getData().items); //remove from store
        payments.removeAll(); //remove from associated store
        paymentStore.sync(); //sync payments with localStorage

        //remove debt from debt store, and sync with localStorage
        debt.getPerson().debts().remove(debt);
        dataview.getStore().remove(debt);
        dataview.getStore().sync();

        debt.getPerson().calcBalance(); //calc balance

        //update the summary
        Payback.app.application.getController('Payback.controller.Summary').updateSummary();

        button.hide(); //bug in project, sometimes button will appear on other debts when deleting a debt from the contact detail

        //refresh DataView
        dataview.refresh();
    },

    updateRecord: function(newRecord, oldRecord) {
        //this stops propagation of event in deleteButtonTap and allows the record to be deleted from the store
        this.callParent(arguments);

        newRecord.getData(true);
        this.child('component').setData(newRecord.data);
    }

});