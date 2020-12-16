# Security policies:
# safeMath and safeCast
Used to prevent overflow and underflow
# Re-entrancyGuard
In ProjectFactory, The Re-entrancyGuard is used since there is a call to another contract's fallback function for ether transfer 