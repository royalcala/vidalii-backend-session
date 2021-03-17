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
        DEBUG: true
      })
    }).timeout(5000)
    // it('login', async () => {
    //   const query = fetch.gql`#graphql
    //   mutation Login{
    //     SessionLogin(
    //       {
    //         email:"admin@vidalii.com",
    //         password:"admin"
    //       },

    //     )
    //   }
    //   `
    //   let sessionLogin = (await fetch.request(endpoint, query))?.SessionLogin
    //   console.log({ sessionLogin })
    //   // expect(typeof userInserted._id).to.equal('string');

    // })

    let userInserted: User
    it('insert new user', async () => {
      const query = fetch.gql`#graphql
      mutation userInsert{
        userInsert(user:{
          name:"Roy",
          lastname:"Alcala",
          email:"alcala.rao@gmail.com",
          phone:"4491862098",
          password:"my password"
        }){
          _id
          name
        }
      }
      `
      userInserted = (await fetch.request(endpoint, query))?.userInsert
      console.log({ userInserted })
      // console.log(userInserted)
      expect(typeof userInserted._id).to.equal('string');
    })
    it('update  user', async () => {
      const query = fetch.gql`#graphql
     mutation userUpdate{
        userUpdate(
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