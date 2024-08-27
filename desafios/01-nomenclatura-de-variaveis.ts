// Nomenclatura de variáveis

const categoryList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getGithubUsernameData(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const githubUsernameAccountResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (githubUsernameAccountResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUsernameData = await githubUsernameAccountResponse.json()

  const sortedCategories = categoryList.sort((a, b) =>  b.followers - a.followers); 

  const userCategory = sortedCategories.find(i => githubUsernameData.followers > i.followers)

  const githubUsernameWithCategory = {
    githubUsername,
    category: userCategory.title
  }

  return githubUsernameWithCategory
}

getGithubUsernameData({ query: {
  username: 'josepholiveira'
}}, {})