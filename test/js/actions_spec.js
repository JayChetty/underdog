import assert from 'assert';
import actions from '../../web/static/js/actions/action';

describe( 'Actions',  () => {

  it( 'should get games', () => {
    const expected = {
      type: "GET_GAMES"
    }
    assert.deepEqual( actions.getGames(), expected );
  })

})
