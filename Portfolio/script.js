document.addEventListener('DOMContentLoaded', function () {
    // Initial rendering of projects when the page loads
    renderProjects();
  
    // Initial rendering of comments when the page loads
    renderComments();
  
    // Initialize particles on page load
    initParticles();
  
    // Add event listener to the form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', validateForm);
  });
  
  
  function validateForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitMessage = document.getElementById('submitMessage');

    if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        submitMessage.innerText = 'Name and email are required fields!';
        submitMessage.style.color = 'red';
    } else {
        // Use the Fetch API to send the form data asynchronously
        fetch('your-server-endpoint', {
            method: 'POST', // or 'GET' depending on your server
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim(),
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response here
                submitMessage.innerText = data.message;
                submitMessage.style.color = data.success ? 'green' : 'red';
            })
            .catch(error => {
                console.error('Error:', error);
                submitMessage.innerText = 'An error occurred. Please try again.';
                submitMessage.style.color = 'red';
            });
    }

    // Show the submit message div
    submitMessage.style.display = 'block';
}
  // Sample comments array (you might fetch this from a server in a real scenario)
  const commentsData = [
    { username: 'User1', comment: 'Great post!' },
    { username: 'User2', comment: 'I learned a lot.' },
  ];
  
  // Function to dynamically add comments to the page
  function renderComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = ''; // Clear existing comments
  
    commentsData.forEach(comment => {
      const li = document.createElement('li');
      li.textContent = `${comment.username}: ${comment.comment}`;
      commentList.appendChild(li);
    });
  }
  
  // Function to add a new comment
  function addComment() {
    const commentInput = document.getElementById('commentInput');
    const newComment = commentInput.value.trim();
  
    if (newComment !== '') {
      // For the sake of the example, let's add the new comment to the local array
      commentsData.push({ username: 'YourUsername', comment: newComment });
  
      // Update the displayed comments
      renderComments();
  
      // Clear the comment input
      commentInput.value = '';
    }
  }
  
  // Initial rendering of comments when the page loads
  window.onload = renderComments;
  
  function animate() {
    const animationBox = document.getElementById('animationBox');
  
    // Generate a random color for the background
    const randomColor = getRandomColor();
  
    // Apply the new color with a smooth transition
    animationBox.style.backgroundColor = randomColor;
  }
  
  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Sample project data
  const projectsData = [
    { title: 'Project 1', description: 'Description for Project 1' },
    { title: 'Project 2', description: 'Description for Project 2' },
    // Add more projects as needed
  ];
  
  // Function to dynamically create project cards
  function renderProjects() {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';
  
    projectsData.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
      carousel.appendChild(card);
    });
  }
  
  // Initial rendering of projects when the page loads
  window.onload = renderProjects;
  
  let animationActive = true;
  let particlesInstance;
  
  function initParticles() {
    particlesInstance = particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 500
          }
        },
        color: {
          value: '#3498db'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: false,
            speed: 20,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3498db',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 4,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
  
  function toggleParticles() {
    animationActive = !animationActive;
  
    if (animationActive) {
      initParticles();
    } else {
      // If turning off animation, destroy the particles instance
      particlesInstance && particlesInstance.fn && particlesInstance.fn.vendors && particlesInstance.fn.vendors.destroy();
    }
  }
  
  // Initialize particles on page load
  document.addEventListener('DOMContentLoaded', initParticles);
