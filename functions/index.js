const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setCustomUserRole = functions.https.onCall(async (data, context) => {
  // Check if the request is authenticated and has admin privileges
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can set roles.');
  }

  // Validate input
  const { uid, role } = data;
  if (!uid || !role) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with uid and role.');
  }

  // Set custom claims based on the role
  try {
    await admin.auth().setCustomUserClaims(uid, { [role]: true });
    return { message: `Role ${role} assigned to user ${uid}.` };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Failed to set custom claims.');
  }
});
