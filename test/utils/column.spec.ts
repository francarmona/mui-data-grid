import { Column, ColumnType, ColumnSortDirection } from '../../src/models';
import { reIndexSortOrders } from '../../src/utils/column';
import { mockColumns } from '../mock';

describe('Column utils', () => {
    describe('reIndexSortOrders', () => {
        it('should re-index sortOrder of columns', () => {
            const expected = { 2: 1, 3: 2, 4: 3, [Number.MAX_VALUE]: 4 };

            expect(reIndexSortOrders(mockColumns)).toEqual(expected);
        });
    });
});
