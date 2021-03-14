import { ColumnType, ColumnsType } from "antd/lib/table";
import { FilterKey, ColumnFilterItem, FilterValue } from "antd/lib/table/interface";
import { Key } from "react";

export interface FilterState<RecordType> {
    column: ColumnType<RecordType>;
    key: Key;
    filteredKeys?: FilterKey;
    forceFiltered?: boolean;
}

function flattenKeys(filters?: ColumnFilterItem[]) {
    let keys: FilterValue = [];
    (filters || []).forEach(({ value, children }) => {
        keys.push(value);
        if (children) {
            keys = [...keys, ...flattenKeys(children)];
        }
    });
    return keys;
}

export function getColumnKey<RecordType>(
    column: ColumnType<RecordType>,
    defaultKey: string
): Key {
    if ("key" in column && column.key !== undefined && column.key !== null) {
        return column.key;
    }
    if (column.dataIndex) {
        return (Array.isArray(column.dataIndex)
            ? column.dataIndex.join(".")
            : column.dataIndex) as Key;
    }

    return defaultKey;
}

export function getColumnPos(index: number, pos?: string) {
    return pos ? `${pos}-${index}` : `${index}`;
}

export function collectFilterStates<RecordType>(
    columns: ColumnsType<RecordType>,
    init: boolean,
    pos?: string
): FilterState<RecordType>[] {
    let filterStates: FilterState<RecordType>[] = [];

    (columns || []).forEach((column, index) => {
        const columnPos = getColumnPos(index, pos);

        if ("children" in column) {
            filterStates = [
                ...filterStates,
                ...collectFilterStates(column.children, init, columnPos),
            ];
        } else if (
            column.filters ||
            "filterDropdown" in column ||
            "onFilter" in column
        ) {
            if ("filteredValue" in column) {
                // Controlled
                let filteredValues = column.filteredValue;
                if (!("filterDropdown" in column)) {
                    filteredValues =
                        filteredValues?.map(String) ?? filteredValues;
                }
                filterStates.push({
                    column,
                    key: getColumnKey(column, columnPos),
                    filteredKeys: filteredValues as FilterKey,
                    forceFiltered: column.filtered,
                });
            } else {
                // Uncontrolled
                filterStates.push({
                    column,
                    key: getColumnKey(column, columnPos),
                    filteredKeys: (init && column.defaultFilteredValue
                        ? column.defaultFilteredValue!
                        : undefined) as FilterKey,
                    forceFiltered: column.filtered,
                });
            }
        }
    });

    return filterStates;
}

export function getFilterData<RecordType>(
    data: RecordType[],
    filterStates: FilterState<RecordType>[]
) {
    return filterStates.reduce((currentData, filterState) => {
        const {
            column: { onFilter, filters },
            filteredKeys,
        } = filterState;
        if (onFilter && filteredKeys && filteredKeys.length) {
            return currentData.filter((record) =>
                filteredKeys.some((key) => {
                    const keys = flattenKeys(filters);
                    const keyIndex = keys.findIndex(
                        (k) => String(k) === String(key)
                    );
                    const realKey = keyIndex !== -1 ? keys[keyIndex] : key;
                    return onFilter(realKey, record);
                })
            );
        }
        return currentData;
    }, data);
}