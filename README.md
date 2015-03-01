# FuryCallStack

It defines a call chain for a single or multiple functions as long as they use
the the same arguments (eg. for hooks).

The chain is executed manually whenever wanted.
For asynchrone serial calls, may works with promises (framework agnostic)
as well as callbacks, but is not required.
