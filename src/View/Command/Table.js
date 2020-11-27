import React from 'react';
import MaterialTable from 'material-table';
const Table=(props)=>{
    return (
        <MaterialTable
            title={props.title}
            columns={props.column}
            data={props.data}
            localization={{
                header:{
                  actions:'عملیات'
                },
                body: {
                    emptyDataSourceMessage: 'داده ای در دسترس نیست',
                    addTooltip:'اضافه کردن داده جدید',
                    deleteTooltip:'حذف داده',
                    editTooltip:'ویرایش داده',
                    filterRow:{
                        filterTooltip:"فیلتر"
                    },
                    editRow:{
                        deleteText:"آیا از حذف داده مطمئن هستید؟",
                        cancelTooltip:"انصراف",
                        saveTooltip:"تایید"
                    },

                },
                grouping:{
                    placeholder:"ستون ها را با کشیدن و رها کردن جابجا کنید"
                },
                toolbar: {
                    searchTooltip: 'جستجو',
                    searchPlaceholder:'جستجو',
                    exportName:'خروجی اکسل'
                },
                pagination: {
                    labelRowsSelect: 'انتخاب',
                    labelDisplayedRows: ' {from}-{to} از {count}',
                    firstTooltip: 'اولین رکورد',
                    previousTooltip: 'رکورد قبلی',
                    nextTooltip: 'رکورد بعدی',
                    lastTooltip: 'آخرین رکورد'
                }
            }}
            editable={props.actions}
            options={{
                actionsColumnIndex: -1,
                filtering: true,
                exportButton: true,
                exportAllData:true

            }}
        />

    );
}
export default Table;

