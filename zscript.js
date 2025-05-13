
        document.addEventListener('DOMContentLoaded', function() {
            let currentSignal = 'red'; // Initially red
            let boyPosition = 90; // Boy starts at 90% (right end)
            const boyImg = document.getElementById('boyImg');
            const boyContainer = document.getElementById('boyContainer');
            const warningMsg = document.getElementById('warning');
            const moveBtn = document.getElementById('moveBtn');

            // Function to change traffic lights
            function changeLight(color) {
                document.getElementById('red').querySelector('circle').setAttribute('fill', color === 'red' ? 'red' : 'grey');
                document.getElementById('yellow').querySelector('circle').setAttribute('fill', color === 'yellow' ? 'yellow' : 'grey');
                document.getElementById('green').querySelector('circle').setAttribute('fill', color === 'green' ? 'green' : 'grey');
                currentSignal = color;
                console.log("Current Signal: " + currentSignal); // Debugging
            }

            // Function to handle the traffic light cycle with individual timings
            function startTrafficLightCycle() {
                // Red light for 3 seconds
                changeLight('red');
                setTimeout(function() {
                    // Yellow light for 3 seconds
                    changeLight('yellow');
                    setTimeout(function() {
                        // Green light for 10 seconds
                        changeLight('green');
                        setTimeout(function() {
                            // Restart the cycle after green is done
                            startTrafficLightCycle(); // Restart the cycle
                        }, 60000); // Green light for 10 seconds
                    }, 3000); // Yellow light for 3 seconds
                }, 3000); // Red light for 3 seconds
            }

            // Start the traffic light cycle when the page loads
            startTrafficLightCycle();

            // Handle move button click
            moveBtn.addEventListener('click', function() {
                console.log("Button clicked, Current Signal: " + currentSignal); // Debugging
                if (currentSignal === 'green') {
                    warningMsg.classList.add('hidden'); // Hide warning

                    // Move boy 10% to the left (decrease right position)
                    if (boyPosition > 0) {
                        boyPosition -= 10; // Decrease position
                        boyContainer.style.right = boyPosition + "%"; // Update boy's position
                        console.log("Boy Position: " + boyPosition); // Debugging
                    } else {
                        alert("The boy has reached the left end!");
                    }
                } else {
                    warningMsg.classList.remove('hidden'); // Show warning
                    console.log("Warning: Wait for green signal!"); // Debugging
                }
            });
        });
