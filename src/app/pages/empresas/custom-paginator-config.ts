import { MatPaginatorIntl } from '@angular/material';

export function CustomPaginatorConfig() {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'Items por página:';
    customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        } length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
    customPaginatorIntl.firstPageLabel = 'Primera';
    customPaginatorIntl.lastPageLabel = 'Ultima';
    customPaginatorIntl.nextPageLabel = 'Siguiente';
    customPaginatorIntl.previousPageLabel = 'Anterior';

    return customPaginatorIntl;
}
