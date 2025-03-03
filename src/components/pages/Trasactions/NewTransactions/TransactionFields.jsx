const transactionfields = (txnTypeOptions, txnCategoryOptions, txnAmountOptions, glAccntOptions, buildings, filteredApartments, selectedCategory, transaction) => {
    const isOtherCategory = selectedCategory === "Other";
    const isEditableCatagory = selectedCategory !== "Maintenance(Tenant)" && selectedCategory !== "Maintenance(Owner)";
    const isAmountEditable = isOtherCategory || isEditableCatagory || (transaction.transactionAmnt === "-1" || !transaction.transactionAmnt);
    const otherTxnTypeOptions = [{id: 1, name: "Cr"}, {id: 2, name: "Db"}];
    const isTxnTypeEnabled = selectedCategory;

    return [
        {
            name: "buildingId",
            label: "Building",
            type: "select",
            col: 6,
            options: buildings,
            optionsId: "bldngId",
            showfield: "",
            valueId: "bldngId",
        },
        {
            name: "aptmntId",
            label: "Apartment",
            type: "select",
            col: 6,
            options: filteredApartments,
            disabled: filteredApartments.length === 0,
            optionsId: "aptmntId",
            valueId: "aptmntId",
        },
        { name: "startDate", label: "Start Date", type: "date", col: 6 },
        { name: "endDate", label: "End Date", type: "date", col: 6 },
        {
            name: "glAccntId",
            label: "Gl Account Number",
            type: "select",
            col: 6,
            options: glAccntOptions,
            optionsId: "glAccntId",
            valueId: "glAccntId",
        },
        {
            name: "transactionCategory",
            label: 'Category',
            type: 'select',
            col: 6,
            options: txnCategoryOptions,
            optionsId: "id",
            valueId: "name",
        },
        {
            name: "transactionType",
            label: "Transaction Type",
            type: "select",
            col: 6,
            options: isOtherCategory ? otherTxnTypeOptions : isTxnTypeEnabled ? txnTypeOptions : [],
            optionsId: "id",
            valueId: "name",
            disabled: !isTxnTypeEnabled,
            // disabled: txnTypeOptions.length === 0,
        },
        {
            name: "transactionAmnt",
            label: 'Transaction Amount',
            type: 'input',
            col: 6,
            disabled: !selectedCategory || !isAmountEditable, 
        },
        { name: "makerRmrks", label: "Remarks", type: "textarea", col: 12, row: 3 },
    ];
};

export default transactionfields;