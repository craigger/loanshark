/*
 * File: app/controller/Summary.js
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

Ext.define('Payback.controller.Summary', {
    extend: 'Ext.app.Controller',

    config: {
        summaryRecord: 0,
        models: [
            'Summary'
        ],

        refs: {
            SummaryContents: '#SummaryContents'
        }
    },

    updateSummary: function() {

        var balance = Ext.getStore('People').sum('balance');
        balance = ((balance<0)?'-':'')+'$'+Math.abs(balance).toFixed(2);

        this.getSummaryRecord().set({
            totalOwed: balance
        });

    },

    launch: function() {
        this.getSummaryContents().setRecord(this.getSummaryRecord());

        Ext.getStore('People').load(function(){
            this.updateSummary();

        }, this);

    },

    applySummaryRecord: function(summaryRecord) {
        //if summary doesn't exist
        if (!summaryRecord){
            summaryRecord = Ext.create('Payback.model.Summary');
        }
        return summaryRecord;

    }

});