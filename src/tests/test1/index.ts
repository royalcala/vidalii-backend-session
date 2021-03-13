import { expect } from 'chai';
import 'mocha';
import { VidaliiService, fetch } from "@vidalii/backend";
import Path from "path";
import { User } from "../../components/user/user.api";
const host = 'localhost'
const port = 4009
const endpoint = `http://${host}:${port}/graphql`

describe('TESTING',
  () => {

    it('start service', async () => {
      await VidaliiService.start({
        INPUT: Path.resolve('.') + '/src/components/**/*',
        DB_PATH: Path.resolve('.') + '/src/tests/test1',
        PORT: port,
        DEBUG:true
      })
    })
    let userInserted: User
    it('insert new user', async () => {
      const query = fetch.gql`#graphql
      mutation UserInsert{
        UserInsert(user:{
          name:"Roy",
          lastname:"Alcala",
          email:"alcala.rao@gmail.com",
          phone:"4491862098"
        }){
          _id
          name
        }
      }
      `
      userInserted = (await fetch.request(endpoint, query)).UserInsert
      console.log(userInserted)
      expect(typeof userInserted._id).to.equal('string');
    })
    it('update  user', async () => {
      const query = fetch.gql`#graphql
     mutation userUpdate{
        UserUpdate(
          _id:\"${userInserted._id}\",
          user:{
          name:"rao updated"
        }){
            _id
            name
          }
}
      `
      const response = await fetch.request(endpoint, query)      
      expect(true).to.equal(true);
    })

    it('sigin user', async () => {


    })

    // after(async function () {
    //   await VidaliiService.stop()
    // });
  })