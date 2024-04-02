import { expect, test } from '@jest/globals'
import { FA } from  '../../../../apps/expo/src/utils/constants';

test('Global FA5 icon sizes', () => {
    expect('reg' in FA).toEqual(true);
    expect('lg' in FA).toEqual(true);
    expect('xl' in FA).toEqual(true);
});