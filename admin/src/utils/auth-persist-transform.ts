import { createTransform } from 'redux-persist';

const authTransform = createTransform(
  // Inbound: Save as-is
  (inboundState) => inboundState,

  // Outbound: Ensure proper types
  (outboundState: any) => {
    if (!outboundState) return outboundState;

    return {
      ...outboundState,
      token: typeof outboundState.token === 'string' ? outboundState.token : null,
      admin: outboundState.admin ? outboundState.admin : null,
      isAuthenticated: typeof outboundState.isAuthenticated === 'boolean' ? outboundState.isAuthenticated : false,
      tokenExpiry: outboundState.tokenExpiry || null,
    };
  },
  { whitelist: ['auth'] }
);

export default authTransform;