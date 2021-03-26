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
    let graphQLClient: fetch.GraphQLClient
    it('sigin', async () => {
      const query = fetch.gql`#graphql
          mutation Login{
              sessionLogin(
                username:"admin@vidalii.com",
                password:"admin"
                )
        }
      `
      let token = (await fetch.request(endpoint, query))?.sessionLogin
      console.log({ token })
      graphQLClient = new fetch.GraphQLClient(endpoint, {
        headers: {
          authorization:token,
        },
      })

      expect(typeof token).to.equal('string');
    })

    let userInserted: User
    it('insert new user', async () => {
      const query = fetch.gql`#graphql
      mutation userInsert($user:UserInsert){
        userInsert(user:$user){
          _id
          name
        }
      }
      `
      const variables = {
        user: {
          name: "Roy",
          lastname: "Alcala",
          email: "alcala.rao@gmail.com",
          phone: "4491862098",
          password: "my password"
        },
      }

      userInserted = (await graphQLClient.request(query, variables))?.userInsert
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
          const response = await graphQLClient.request(query)
          expect(true).to.equal(true);
        })

    //     it('sigin user', async () => {


    //     })

    // after(async function () {
    //   await VidaliiService.stop()
    // });
  })