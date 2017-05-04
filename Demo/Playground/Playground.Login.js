
/* Playground Demo: Login */

/*
  
  This playground demo is still in production
  
  I will improve this shortly and add the options to recover and reset the password
  
  Let me know if you have questions or ideas how to improve this login modal:
  
  stephanwagner.me@gmail.com
  
*/


// We are ssetting up a global variable where we can adjust html and texts

var jBoxLogin = {
  jBox: null,
  
  
  // The html of each of the content containers
  
  html: {
    login: '<div id="LoginContainer-login" class="login-container"><div class="login-body"><input type="text" id="loginUsername" class="login-textfield" placeholder="Username" autocorrect="off" autocapitalize="off" spellcheck="false"><input type="password" id="loginPassword" class="login-textfield" placeholder="Password" autocorrect="off" autocapitalize="off" spellcheck="false"><div class="login-remember"><div class="login-checkbox"><div class="login-checkbox-check"></div></div><div class="login-checkbox-label">Remember me</div><input type="hidden" name="login-remember" value="1"></div><button class="login-button">Login</button></div><div class="login-footer"><span onclick="jBoxLogin.jBox.showContent(\'register\')">Create new account</span><br><span style="display: none" onclick="jBoxLogin.jBox.showContent(\'password-recovery\')">Forgot password?</span></div></div>',
    register: '<div id="LoginContainer-register" class="login-container"><div class="login-body"><input type="text" id="registerUsername" class="login-textfield" placeholder="Username" maxlength="24" autocorrect="off" autocapitalize="off" spellcheck="false"><input type="text" id="registerEmail" class="login-textfield" placeholder="Email address" maxlength="128" autocorrect="off" autocapitalize="off" spellcheck="false"><div class="login-textfield-wrapper"><input type="password" class="login-textfield" id="registerPassword" placeholder="Password" maxlength="32" autocorrect="off" autocapitalize="off" spellcheck="false"><div class="password-strength" style="display: none"></div></div><button class="login-button">Create account</button></div><div class="login-footer"><span onclick="jBoxLogin.jBox.showContent(\'login\')">Already registered? Login!</span></div></div>',
    passwordRecovery: '', // TODO '<div id="LoginContainer-password-recovery" class="login-container"><div class="login-body"><input type="text" class="login-textfield" placeholder="Email address" autocorrect="off" autocapitalize="off" spellcheck="false"><button class="login-button">Reset password</button></div><div class="login-footer"><span onclick="jBoxLogin.jBox.showContent(\'login\')">Already registered? Login!</span></div></div>',
    passwordReset: '' // TODO '<div id="LoginContainer-password-reset" class="login-container"><div class="login-body"><input type="text" placeholder="Recovery Code"><input type="password" placeholder="Password" autocorrect="off" autocapitalize="off" spellcheck="false"><button class="login-button">Reset password</button></div><div class="login-footer"><span onclick="jBoxLogin.jBox.showContent(\'login\')">Already registered? Login!</span></div></div>'
  },
  
  
  // Corresponding titles for content elements
  
  title: {
    login: 'Login',
    register: 'Create new account',
    // TODO passwordRecovery: 'Recover password',
    // TODO passwordReset: 'Reset password'
  },
  
  
  // These tooltips will show when a textelemet gets focus
  
  textfieldTooltips: {
    loginUsername: 'For this demo the username is "username"',
    loginPassword: 'For this demo the password is "password"',
    registerUsername: 'Choose a unique username',
    registerEmail: 'Your email address',
    registerPassword: 'Be tricky, use numbers and special characters'
  }
  
};


$(document).ready(function() {
  
  
  // On domready create the login modal

  jBoxLogin.jBox = new jBox('Modal', {
    
    // Unique id for CSS access
    id: 'jBoxLogin',
    
    // Dimensions
    width: 320,  // TODO move to global var
    height: 350,
    
    // Attach to elements
    attach: '#DemoLogin',
    
    // Create the content with the html provided in global var
    content: '<div id="LoginWrapper">' + jBoxLogin.html.login + jBoxLogin.html.register + jBoxLogin.html.passwordRecovery + jBoxLogin.html.passwordReset + '</div>',
    
    // When the jBox is being initialized add internal functions
    onInit: function () {
      
      // Internal function to show content
      this.showContent = function (id, force) {
        
        // Abort if an ajax call is loading
        if (!force && $('#LoginWrapper').hasClass('request-running')) return null;
        
        // Set the title depending on id
        this.setTitle(jBoxLogin.title[id]);
        
        // Show content depending on id
        $('.login-container.active').removeClass('active');
        $('#LoginContainer-' + id).addClass('active');
        
        // Remove error tooltips
        // TODO only loop through active elements or store tooltips in global var rather than on the element
        $.each(jBoxLogin.textfieldTooltips, function (id, tt) {
          $('#' + id).data('jBoxTextfieldError') && $('#' + id).data('jBoxTextfieldError').close();
        });
      };
      
      // Initially show content for login
      this.showContent('login', true);
      
      // Add focus and blur events to textfields
      $.each(jBoxLogin.textfieldTooltips, function (id, tt) {
        
        // Focus an textelement
        $('#' + id).on('focus', function () {
          
          // When there is an error tooltip close it
          $(this).data('jBoxTextfieldError') && $(this).data('jBoxTextfieldError').close();
          
          // Remove the error state from the textfield
          $(this).removeClass('textfield-error');
          
          // Store the tooltip jBox in the elements data
          if (!$(this).data('jBoxTextfieldTooltip')) {
            
            // TODO create a small jbox plugin
            
            $(this).data('jBoxTextfieldTooltip', new jBox('Tooltip', {
              width: 310, // TODO use modal width - 10
              theme: 'TooltipSmall',
              addClass: 'LoginTooltipSmall',
              target: $(this),
              position: {
                x: 'left',
                y: 'top'
              },
              outside: 'y',
              offset: {
                y: 6,
                x: 8
              },
              pointer: 'left:17',
              content: tt,
              animation: 'move'
            }));
          }
          $(this).data('jBoxTextfieldTooltip').open();
          
        // Loose focus of textelement
        }).on('blur', function () {
          $(this).data('jBoxTextfieldTooltip').close();
        });
      });
      
      // Internal function to show errors
      this.showError = function (element, message) {
        
        if (!element.data('errorTooltip')) {
          
          // TODO add the error class here
          
          element.data('errorTooltip', new jBox('Tooltip', {
            width: 310,
            theme: 'TooltipError',
            addClass: 'LoginTooltipError',
            target: element,
            position: {
              x: 'left',
              y: 'top'
            },
            outside: 'y',
            offset: {
              y: 6
            },
            pointer: 'left:9',
            content: message,
            animation: 'move'
          }));
        }
        
        element.data('errorTooltip').open();
      };
      
      // Internal function to change checkbox state
      this.toggleCheckbox = function () {
        // Abort if an ajax call is loading
        if ($('#LoginWrapper').hasClass('request-running')) return null;
        
        $('.login-checkbox').toggleClass('login-checkbox-active');
      };
      
      // Add checkbox events to checkbox and label
      $('.login-checkbox, .login-checkbox-label').on('click', function () {
        this.toggleCheckbox();
      }.bind(this));
      
      // Parse an ajax repsonse
      this.parseResponse = function(response) {
      	try {
      		response = JSON.parse(response.responseText || response);
      	} catch (e) {}
      	return response;
      };
      
      // Show a global error
      this.globalError = function () {
        new jBox('Notice', {
          color: 'red',
          content: 'Oops, something went wrong.',
          attributes: {
            x: 'right',
            y: 'bottom'
          }
        });
      };
      
      // Internal function to disable or enable the form while request is running
      this.startRequest = function() {
        this.toggleRequest();
      }.bind(this);
      
      this.completeRequest = function() {
        this.toggleRequest(true);
      }.bind(this);
      
      this.toggleRequest = function (enable) {
        $('#LoginWrapper')[enable ? 'removeClass' : 'addClass']('request-running');
        $('#LoginWrapper button')[enable ? 'removeClass' : 'addClass']('loading-bar');
        $('#LoginWrapper input, #LoginWrapper button').attr('disabled', enable ? false : 'disabled');
      }.bind(this);
      
      // Bind ajax login function to login button
      $('#LoginContainer-login button').on('click', function () {
        $.ajax({
          url: 'https://stephanwagner.me/PlaygroundLogin/login',
          data: {
            username: $('#loginUsername').val(),
            password: $('#loginPassword').val(),
            remember: $('.login-checkbox').hasClass('login-checkbox-active') ? 1 : 0
          },
          method: 'post',
          beforeSend: function () {
            this.startRequest();
          }.bind(this),
          
          // Ajax call successfull
          success: function (response) {
            this.completeRequest();
            response = this.parseResponse(response);
            
            // Login successfull
            if (response.success) {
              
              this.close();
              
              new jBox('Notice', {
                color: 'green',
                content: 'You are now logged in',
                attributes: {
                  x: 'right',
                  y: 'bottom'
                }
              });
              
              
              // Redirect or own login behavior here
              
            
            // Login failed
            } else {
              // Shake submit button
              this.animate('shake', {element: $('#LoginContainer-login button')});
              
              if (response.errors) {
                // Show error on textfields, for login no error tooltips neccessary, username or password is wrong
                $('#loginUsername, #loginPassword').addClass('textfield-error');
              } else {
                // Backend error
                this.globalError();
              }
            }
          }.bind(this),
          
          // Ajax call failed
          error: function () {
            this.completeRequest();
            this.animate('shake', {element: $('#LoginContainer-login button')});
            this.globalError();
          }.bind(this)
        });
      
      }.bind(this));
      
      // Bind ajax register function to register button
      $('#LoginContainer-register button').on('click', function () {
        $.ajax({
          url: 'https://stephanwagner.me/PlaygroundLogin/register',
          data: {
            username: $('#registerUsername').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()
          },
          method: 'post',
          beforeSend: function () {
            this.startRequest();
          }.bind(this),
          
          success: function (response) {
            this.completeRequest();
            response = this.parseResponse(response);
            
            // Registration successfull
            if (response.success) {
              
              this.close();
              
              new jBox('Notice', {
                color: 'green',
                content: 'Your account was created',
                attributes: {
                  x: 'right',
                  y: 'bottom'
                }
              });
              
              
              // Redirect or own register behavior here
              
            
            // Registration failed
            } else {
              // Shake submit button
              this.animate('shake', {element: $('#LoginContainer-register button')});
              
              if (response.errors) {
                
                // Loop through errors and open tooltips
                $.each(response.errors, function (id, error) {
                  
                  // TODO Only one tooltip at a time
                  
                  var id_selector = 'register' + (id).substr(0,1).toUpperCase() + (id).substr(1);
                  
                  $('#' + id_selector).addClass('textfield-error');
                  
                  if (!$('#' + id_selector).data('jBoxTextfieldError')) {
                    $('#' + id_selector).data('jBoxTextfieldError', new jBox('Tooltip', {
                      width: 310,
                      theme: 'TooltipError',
                      addClass: 'LoginTooltipError',
                      target: $('#' + id_selector),
                      position: {
                        x: 'left',
                        y: 'top'
                      },
                      outside: 'y',
                      offset: {
                        y: 6,
                        x: 8
                      },
                      pointer: 'left:17',
                      //content: error,
                      animation: 'move'
                    }));
                  }
                  
                  $('#' + id_selector).data('jBoxTextfieldError').setContent(error).open();
                  
                });
                
              // Backend error
              } else {
                this.globalError();
              }
            }
          }.bind(this),
          
          // Ajax call failed
          error: function () {
            this.completeRequest();
            this.animate('shake', {element: $('#RegisterContainer-login button')});
            this.globalError();
          }.bind(this)
        });
      
      }.bind(this));
      
    },
    onOpen: function () {
      
      // Go back to login when we open the modal
      this.showContent('login', true);
      
    },
    onClose: function () {
        
        // TODO reset form completely
        // TODO only close jBox with close button, not on overlay click
        
        // Remove error tooltips
        // TODO Better to reset the form, this loop is also in showContent
        $.each(jBoxLogin.textfieldTooltips, function (id, tt) {
          $('#' + id).data('jBoxTextfieldError') && $('#' + id).data('jBoxTextfieldError').close();
        });
        
    }
  });
});