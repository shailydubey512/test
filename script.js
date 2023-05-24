const baseUrl = 'http://localhost:3000/users';

function getAllUsers() {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      console.log('All Users:', data);
      // Do something with the data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function createUser(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const user = {
    name,
    email
  };

  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok) {
        console.log('User created successfully');
        // Do something on success
      } else {
        throw new Error('Error creating user');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
