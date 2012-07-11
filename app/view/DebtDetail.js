/*
 * File: app/view/DebtDetail.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Payback.view.DebtDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.DebtDetail',

    config: {
        padding: '0 0 12px 0',
        style: 'background:  black; ',
        autoDestroy: false,
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'saveDebt',
                        iconCls: 'icon-save',
                        iconMask: true,
                        text: 'save'
                    }
                ]
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                ui: 'light',
                title: 'Loan Details',
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'cancelDebt',
                        iconCls: 'icon-back',
                        iconMask: true,
                        text: 'Cancel'
                    },
                    {
                        xtype: 'button',
                        align: 'right',
                        cls: 'my-buttons',
                        id: 'emailDebt',
                        iconCls: 'icon-email',
                        iconMask: true,
                        text: 'Send Email'
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 10px 0',
                items: [
                    {
                        xtype: 'label',
                        height: 100,
                        id: 'debtHeaderLabel',
                        style: 'font-weight: bold;text-align: center; font-size: 75px;background-color: #FE8A28; color: white;'
                    },
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'addPayment',
                        margin: '10px 10px 5px 10px',
                        padding: '5px',
                        style: 'border-radius: 0; color: black;',
                        ui: 'gray-light-button',
                        text: 'Add Payment'
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset1',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: 'Prey',
                                labelAlign: 'top',
                                name: 'person_id',
                                displayField: 'name',
                                store: 'People',
                                valueField: 'id'
                            },
                            {
                                xtype: 'datepickerfield',
                                label: 'Date',
                                labelAlign: 'top',
                                name: 'date',
                                picker: {
                                    ui: 'dark',
                                    doneButton: {
                                        cls: 'my-buttons',
                                        ui: 'gray-button'
                                    },
                                    cancelButton: {
                                        cls: 'my-buttons',
                                        ui: 'gray-light-button'
                                    }
                                }
                            },
                            {
                                xtype: 'numberfield',
                                itemId: 'mynumberfield',
                                label: 'Original Loan Amount',
                                labelAlign: 'top',
                                name: 'amount'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Notes',
                                labelAlign: 'top',
                                name: 'reason'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'label',
                        html: 'Payment History',
                        id: 'paymentHistoryLabel',
                        margin: '0 12px',
                        padding: '0 0 8px 8px',
                        style: 'font-size: .8em; font-weight: bold;color: gray;border-bottom: 2px solid #333;'
                    },
                    {
                        xtype: 'dataview',
                        baseCls: 'x-list',
                        cls: [
                            'x-list-normal'
                        ],
                        id: 'myPaymentDataView',
                        itemId: 'myPaymentDataView',
                        minHeight: '',
                        padding: '0 22px',
                        style: 'color: white;',
                        defaultType: 'myPaymentListItem',
                        scrollable: false,
                        store: 'Payments',
                        useComponents: true,
                        disableSelection: true
                    }
                ]
            }
        ]
    }

});