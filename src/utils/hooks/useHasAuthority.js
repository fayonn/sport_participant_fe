export const useHasAuthority = (roles) => {
  return (allowedRoles) => roles.every((x) => (allowedRoles.includes(x)))
}