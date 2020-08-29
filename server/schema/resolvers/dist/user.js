"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var User_1 = require("./../../models/User");
var userValidation_1 = require("./../../middlewares/validation/userValidation");
var userValidation_2 = require("./../../middlewares/validation/userValidation");
var jwt = require("jsonwebtoken");
var auth_1 = require("../../middlewares/auth");
var cloudinary = require("cloudinary").v2;
/* // in case for local upload
const uploadDir = "./client/public/images/users_images";

// Ensure upload directory exists
mkdirp.sync(uploadDir);

const storeUpload = async ({ stream, filename }: any): Promise<any> => {
  const id = shortid.generate();
  const fileName = `${id}-${filename}`;
  const path = `${uploadDir}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path, fileName }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  const { createReadStream, filename } = await upload;
  const stream = createReadStream();
  const { path, fileName } = await storeUpload({ stream, filename });

  console.log(path, fileName);

  return { path, fileName };
}; */
var resultUrl = "", resultSecureUrl = "";
var cloudinaryUpload = function (_a) {
    var stream = _a.stream;
    return __awaiter(void 0, void 0, void 0, function () {
        var cloudinary, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cloudinary = require("cloudinary");
                    cloudinary.config({
                        cloud_name: "hamohuh",
                        api_key: "838736889631699",
                        api_secret: "4V8gR-toRb1FCVmfmD5nM-mGL5M"
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var streamLoad = cloudinary.v2.uploader.upload_stream(function (error, result) {
                                if (result) {
                                    resultUrl = result.secure_url;
                                    resultSecureUrl = result.secure_url;
                                    resolve(resultUrl);
                                }
                                else {
                                    reject(error);
                                }
                            });
                            stream.pipe(streamLoad);
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    throw new Error("Failed to upload profile picture ! Err:" + err_1.message);
                case 4: return [2 /*return*/];
            }
        });
    });
};
var processUpload = function (upload) { return __awaiter(void 0, void 0, void 0, function () {
    var createReadStream, stream;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, upload];
            case 1:
                createReadStream = (_a.sent()).createReadStream;
                stream = createReadStream();
                return [4 /*yield*/, cloudinaryUpload({ stream: stream })];
            case 2:
                _a.sent();
                return [2 /*return*/, resultUrl];
        }
    });
}); };
var userResolver = {
    Query: {
        // current user query
        me: function (_, __, _a) {
            var req = _a.req, res = _a.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, me, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            _b.sent();
                            myId = req.user.userId;
                            me = User_1["default"].findById(myId)
                                .populate({
                                path: "friendsPending",
                                model: "NewUser"
                            })
                                .exec();
                            return [2 /*return*/, {
                                    ok: true,
                                    user: me
                                }];
                        case 2:
                            error_1 = _b.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_1.message
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        // all users query
        users: function (parent, _a, _b) {
            var id = _a.id;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var allUsers, error_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, User_1["default"].find()
                                    .populate({
                                    path: "friendsPending",
                                    model: "NewUser"
                                })
                                    .populate({
                                    path: "friends",
                                    model: "NewUser"
                                })
                                    .exec()];
                        case 2:
                            allUsers = _c.sent();
                            return [2 /*return*/, {
                                    ok: true,
                                    users: allUsers
                                }];
                        case 3:
                            error_2 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_2.message
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // one user query
        userInfo: function (parent, _a, _b) {
            var userName = _a.userName;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, User_1["default"].findOne({ userName: userName })
                                    .populate({
                                    path: "friendsPending",
                                    model: "NewUser"
                                })
                                    .populate({
                                    path: "friends",
                                    model: "NewUser"
                                })
                                    .exec()];
                        case 1:
                            user = _c.sent();
                            return [2 /*return*/, {
                                    user: user,
                                    ok: true
                                }];
                        case 2:
                            error_3 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_3.message
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        // fetch friends requests
        friendRequests: function (parent, args, _a) {
            var req = _a.req, res = _a.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, user, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            _b.sent();
                            myId = req.user.userId;
                            return [4 /*yield*/, User_1["default"].findOne({ userName: args.userName })
                                    .populate({
                                    path: "friendsPending",
                                    model: "NewUser"
                                })
                                    .populate({
                                    path: "friends",
                                    model: "NewUser"
                                })
                                    .exec()];
                        case 2:
                            user = _b.sent();
                            return [2 /*return*/, {
                                    friends: user.friendsPending,
                                    ok: true
                                }];
                        case 3:
                            error_4 = _b.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_4.message
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    },
    /* User: {
      contactInfo: async (parent: any) => {
        let me = await User.findById(parent.id).exec();
        console.log(me);
  
        return me.contactInfo;
      }
    }, */
    Mutation: {
        //signup mutation
        signUp: function (_, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var newUser, user, token, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // 1- validate input data
                        return [4 /*yield*/, userValidation_1.signupvalidatation.validate(args)];
                    case 1:
                        // 1- validate input data
                        _a.sent();
                        newUser = new User_1["default"]({
                            userName: args.userName,
                            email: args.email,
                            password: args.password,
                            verifyPassword: args.verifyPassword,
                            firstName: args.firstName,
                            lastName: args.lastName,
                            role: "user",
                            gender: args.gender,
                            country: args.country
                        });
                        user = newUser.save();
                        token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
                            expiresIn: "1y"
                        });
                        // 4- set a cookies with the token value and it's httpOnly
                        context.res.cookie("token", token, {
                            expires: new Date(Date.now() + 900000),
                            httpOnly: true,
                            secure: true,
                            domain: "localhost",
                            path: "/"
                        });
                        return [2 /*return*/, { ok: true, user: user, successMessage: "Registered Successfully" }];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, {
                                ok: false,
                                error: error_5.message
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        //******************************************
        //*********** login mutation ***************
        //******************************************
        login: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var userName, user, token, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        //1- validate input data
                        return [4 /*yield*/, userValidation_2.loginValidatation.validate(args)];
                    case 1:
                        //1- validate input data
                        _a.sent();
                        userName = args.userName;
                        return [4 /*yield*/, User_1["default"].findOne({ userName: userName })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    ok: false,
                                    error: "no such user"
                                }];
                        }
                        token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
                            expiresIn: "1y"
                        });
                        // 4- set a cookies with the token value and it's httpOnly
                        context.res.cookie("token", token, {
                            expires: new Date(Date.now() + 18000000),
                            httpOnly: true,
                            secure: true,
                            domain: "localhost",
                            path: "/"
                        });
                        return [2 /*return*/, { ok: true, user: user, successMessage: "Logged in Successfully" }];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, {
                                ok: false,
                                error: error_6.message
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        //logout Mutation
        logout: function (_, __, _a) {
            var req = _a.req, res = _a.res;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    res.clearCookie("token", {
                        domain: "localhost",
                        path: "/"
                    });
                    return [2 /*return*/, {
                            ok: true
                        }];
                });
            });
        },
        // Delete user mutation
        deleteUser: function (_, args, _a) {
            var req = _a.req, res = _a.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var id, error_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            // 1- authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- authenticate user
                            _b.sent();
                            id = args.id;
                            return [4 /*yield*/, User_1["default"].findByIdAndDelete(id)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "Deleted Successfully"
                                }];
                        case 3:
                            error_7 = _b.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_7.message
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // Delete user mutation
        uploadProfilePictures: function (_, _a, _b) {
            var file = _a.file;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId_1, error_8;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            // 1- Authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- Authenticate user
                            _c.sent();
                            myId_1 = req.user.userId;
                            // 2- Get the uploaded pictures url, and update the user's pictures in the DB
                            return [4 /*yield*/, Promise.all(file.map(processUpload)).then(function (res) {
                                    var newPics = res;
                                    User_1["default"].findByIdAndUpdate({ _id: myId_1 }, { $push: { pictures: { $each: newPics } } }, { useFindAndModify: false, upsert: true }).exec();
                                })];
                        case 2:
                            // 2- Get the uploaded pictures url, and update the user's pictures in the DB
                            _c.sent();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "Pictures uploaded to your account"
                                }];
                        case 3:
                            error_8 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_8.message
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // delete profile picture
        deleteProfilePicture: function (_, _a, _b) {
            var name = _a.name;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, e_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            // 1- authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- authenticate user
                            _c.sent();
                            myId = req.user.userId;
                            // 2- find pic and delete
                            User_1["default"].findByIdAndUpdate({ _id: myId }, { $pull: { pictures: name } }, { useFindAndModify: false, upsert: true }).exec();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "Picture was deleted"
                                }];
                        case 2:
                            e_1 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: e_1.message
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        // choose profile picture
        chooseProfilePicture: function (_, _a, _b) {
            var name = _a.name;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, e_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            // 1- authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- authenticate user
                            _c.sent();
                            myId = req.user.userId;
                            // 2- find pic and delete
                            User_1["default"].findByIdAndUpdate({ _id: myId }, { $set: { avatarUrl: name } }, { useFindAndModify: false, upsert: true }).exec();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "Profile photo was updated"
                                }];
                        case 2:
                            e_2 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: e_2.message
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        // update User info
        updateProfileInfo: function (_, args, _a) {
            var req = _a.req, res = _a.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, error_9;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            // 1- authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- authenticate user
                            _b.sent();
                            // 2- validate inputs
                            return [4 /*yield*/, userValidation_1.updateProfileValidation.validate(args)];
                        case 2:
                            // 2- validate inputs
                            _b.sent();
                            myId = req.user.userId;
                            // 3- find the user and update the given fields
                            User_1["default"].findByIdAndUpdate({ _id: myId }, { $set: args }, { useFindAndModify: false, upsert: true }).exec();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "Profile updated Successfully"
                                }];
                        case 3:
                            error_9 = _b.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: error_9.message
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // add friend
        addFriend: function (_, _a, _b) {
            var id = _a.id;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, e_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            // 1- authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- authenticate user
                            _c.sent();
                            myId = req.user.userId;
                            // 2- find the friend you wanna add and update its pending friends array
                            return [4 /*yield*/, User_1["default"].findByIdAndUpdate({ _id: id }, { $push: { friendsPending: myId } }, { useFindAndModify: false }).exec()];
                        case 2:
                            // 2- find the friend you wanna add and update its pending friends array
                            _c.sent();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "Friends Request sent"
                                }];
                        case 3:
                            e_3 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: e_3.message
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        // accept friend request
        acceptFriend: function (_, _a, _b) {
            var id = _a.id;
            var req = _b.req, res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var myId, e_4;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            // 1- authenticate user
                            return [4 /*yield*/, auth_1.userAuth(req)];
                        case 1:
                            // 1- authenticate user
                            _c.sent();
                            myId = req.user.userId;
                            // 2- find the friend you wanna add and update its pending friends array
                            User_1["default"].findOneAndUpdate({ _id: myId }, { $push: { friends: id }, $pull: { friendsPending: id } }).exec();
                            return [2 /*return*/, {
                                    ok: true,
                                    successMessage: "You're now friends"
                                }];
                        case 2:
                            e_4 = _c.sent();
                            return [2 /*return*/, {
                                    ok: false,
                                    error: e_4.message
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
    }
};
exports["default"] = userResolver;
