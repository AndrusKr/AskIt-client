import React, { useState, useContext, useEffect, setState } from "react"
import AuthContext from "../../context/auth/authContext"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const SignInPage = (props) => {
  const authContext = useContext(AuthContext)
  const { signIn, isAuthenticated } = authContext

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
      props.history.push("/")
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history])
  const [nickname, setNickname] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    signIn(nickname)
  }
  return (
    <Grid
      mt={56}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={11}>
        <Typography component="h1" variant="h3" align="center">
          <span>Hi</span>👋🏻
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Please, enter Your Nicknameツ"
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            name="nickname"
            value={nickname}
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Let's Go!
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}
export default SignInPage
