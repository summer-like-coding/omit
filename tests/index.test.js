import assert from 'assert';
import omit from '../src';

describe('omit', () => {
  it('should create a shallow copy', () => {
    const benjy = { name: 'Benjy' };
    const copy = omit(benjy, []);
    assert.deepEqual(copy, benjy);
    assert.notEqual(copy, benjy);
  });

  it('should drop fields which are passed in', () => {
    const benjy = { name: 'Benjy', age: 18 };
    assert.deepEqual(omit(benjy, ['name']), { age: 18 });
    assert.deepEqual(omit(benjy, ['name', 'age']), {});
  });
  it('summer test', () => {
    const benjy = { name: 'Benjy', age: 18 };
    // assert.deepEqual(omit(benjy, ['name']), {name:'Benjy'});
    assert.deepEqual(omit(benjy, ['name', 'age']), {});
  });
});
