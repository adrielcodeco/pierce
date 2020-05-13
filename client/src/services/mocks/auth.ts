import MockAdapter from './mockAdapter'
import short from 'short-uuid'

MockAdapter.onPost('/auth/token', {
  asymmetricMatch: (actual: any) =>
    actual.grant_type === 'password' && /test/.test(actual.username)
})
  .reply(200, {
    data: { access_token: short.generate(), refresh_token: short.generate() }
  })
  .onPost('/auth/token', {
    asymmetricMatch: (actual: any) => actual.grant_type === 'refresh_token'
  })
  .reply(200, {
    data: { access_token: short.generate(), refresh_token: short.generate() }
  })
  .onPost('/auth/token')
  .reply(403, {})
