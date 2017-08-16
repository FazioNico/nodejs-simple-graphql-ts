/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-08-2017
 */

export const CONFIG:{server:{PORT:number},database:{HOST:string},secretTokent:string} = {
	server: {
		PORT: +process.env.PORT || 8080,
	},
	database: {
		HOST: process.env.MONGODB || 'mongodb://localhost:27017/local'
	},
	secretTokent: 'this is a bad secret sentence'
};
