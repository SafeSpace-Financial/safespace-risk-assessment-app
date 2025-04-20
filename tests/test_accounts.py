from app.models import db, Account
from app import create_app
import unittest
from datetime import datetime
# from app.utils.util import encode_token

# Account Test Cases
class TestAccount(unittest.TestCase):
    def setUp(self):
        self.app = create_app("TestingConfig")
        self.customer = Account() # enter account details for test login between ()
        with self.app.app_context():
            db.drop_all()
            db.create_all()
            db.session.add(self.customer)
            db.session.commit()
        self.token = encode_token(1) # needs to be updated to reflect the actual function being used
        self.client = self.app.test_client()

    # Create New Account
    # Log Into Account, establishing auth
    # Get Account by ID, auth required
    # Update Account by ID, auth required
    # Delete Account by ID, auth required