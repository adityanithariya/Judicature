function infoln() {
  println "${C_BLUE}${1}${C_RESET}"
}

# println echos string
function println() {
  echo -e "$1"
}