#!/bin/bash
set -e

( #
  cd www/src/extras
  [ ! -e "extra-js-cognito" ] && git clone https://github.com/juliendecharentenay/extra-js-cognito.git
  [ ! -e "extra-vue-ui" ] && git clone https://github.com/juliendecharentenay/extra-vue-ui.git
)

( #
  cd rust/extras
  [ ! -e "derive-sql" ] && git clone https://github.com/juliendecharentenay/derive-sql.git
)
