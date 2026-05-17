function generateRandomEmail() {
  return `user_${Date.now()}@test.com`;
}

function generateRandomName() {
  return `TestUser_${Date.now()}`;
}

module.exports = {
  generateRandomEmail,
  generateRandomName
};