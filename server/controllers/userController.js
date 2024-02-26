const User = require("../models/User.js");
const Org = require("../models/Organization.js");
const { getFabric } = require("../fabric/index.js");
const registerAndEnrollUser = require("../utils/registerUser");

exports.updateProfile = async (req, res) => {
	const { firstName, lastName, phone, state, city } = req.body.variables.user;

	let user = await User.findOne({ _id: req.user.id });
	const org = await Org.findOne({ orgName: state });

	user.firstName = firstName;
	user.lastName = lastName;
	user.phone = phone;
	user.state = state;
	user.city = city;
	user.org = org._id;
	await user.save();

	user = await User.findOne({ _id: req.user.id });

	const { wallet, caClient, contract } = await getFabric(
		org.msp,
		org.orgUrl,
		user.username,
		org.channelName,
		user.role,
	);

	if (!contract) {
		await registerAndEnrollUser(
			caClient,
			wallet,
			`${org.msp}MSP`,
			user.username,
		);
	}

	req.user = user;

	return {
		status: "success",
		message: "Profile has been updated",
		statusCode: 200,
	};
};

exports.allStates = async (req, res) => {
	const states = await Org.find({}, { _id: 0, orgName: 1 }).where({
		parent: { $ne: null },
		category: "evault",
	});
	const stateArray = [];
	states.map((e) => {
		stateArray.push(e.orgName);
	});
	return {
		status: "success",
		data: stateArray,
		statusCode: 200,
	};
};
