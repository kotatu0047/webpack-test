import axios from 'axios'

async function getUser() {
  const res = await axios.get('/api/user/1')

  return res.data
}

getUser().then(
  /**
   * @param user {userModel}
   */
  user => {
    const email = user.profile.company.companyInfo.contact.email
    console.log(email)
  },
)
