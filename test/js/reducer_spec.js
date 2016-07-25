import assert from 'assert';
import reducer from '../../web/static/js/reducers/reducer';
import actions from '../../web/static/js/actions/actions';

describe( 'reducer', () => {

  it( 'should return the initial state', () => {
    const state = reducer( undefined, {} )
    assert.deepEqual( state, {
        fixtures: [],
        teams: [],
        predictions: [],
        session: null,
        displayWeek: null
      })
  })

})
