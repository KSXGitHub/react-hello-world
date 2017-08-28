(
  printf "Checking Code Style... "
  standard $STANDARD_ARGV > stdout.tmp 2> stderr.tmp && (
    echo "passed"
  ) || (
    code=$?
    echo "failed" >&2
    cat stderr.tmp >&2
    cat stdout.tmp
    exit $code
  )
) && (
  if [[ $COVERALLS == 'true' ]];
    then
      bash ./sh/test-coverage.sh -- $JEST_ARGV
    else
      bash ./sh/jest.sh -- $JEST_ARGV
  fi
) && (
  bash ./sh/build.sh
)
