import firebase from "firebase";

export default {
  computed: {
    loggedIn() {
      if (firebase.auth().currentUser) return true;
      return false;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log(firebase.auth().currentUser);
          this.$router.replace("Login");
        });
    }
  }
};
