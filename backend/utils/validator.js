const validator = {
    isEmail: (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.[^<>()\[\]\\.,;:\s@"]{2,}))$/i;
      return re.test(String(email).toLowerCase());
    },
  
    isValidPassword: (password) => {
      return password.length >= 6;
    }
  };
  
  module.exports = validator;
  