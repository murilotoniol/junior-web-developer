import { PasswordUtil } from '../shared/utils/password.util';

describe('PasswordUtil', () => {
  it('hashes and compares passwords', async () => {
    const password = 'mySecret123';
    const hash = await PasswordUtil.hash(password);
    expect(typeof hash).toBe('string');

    const isValid = await PasswordUtil.compare(password, hash);
    expect(isValid).toBe(true);
  });
});
