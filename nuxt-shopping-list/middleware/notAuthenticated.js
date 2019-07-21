export default function ({ store, redirect }) {
    // Redirect user to login if no-one is signed in.
    if (!store.state.auth.loggedIn) {
      return redirect('/login')
    }
}
