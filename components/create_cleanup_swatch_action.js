function createCleanupSwatchesAction()
{
	var localValid = true;

	var dest = new Folder("~/Documents");
	var actionFile = new File(dest + "/cleanup_swatches.aia" );

	var actionString =
	["/version 3",
	"/name [ 16",
	"	636c65616e75705f7377617463686573",
	"]",
	"/isOpen 1",
	"/actionCount 1",
	"/action-1 {",
	"	/name [ 16",
	"		636c65616e75705f7377617463686573",
	"	]",
	"	/keyIndex 5",
	"	/colorIndex 0",
	"	/isOpen 1",
	"	/eventCount 2",
	"	/event-1 {",
	"		/useRulersIn1stQuadrant 0",
	"		/internalName (ai_plugin_swatches)",
	"		/localizedName [ 8",
	"			5377617463686573",
	"		]",
	"		/isOpen 0",
	"		/isOn 1",
	"		/hasDialog 0",
	"		/parameterCount 1",
	"		/parameter-1 {",
	"			/key 1835363957",
	"			/showInPalette 4294967295",
	"			/type (enumerated)",
	"			/name [ 17",
	"				53656c65637420416c6c20556e75736564",
	"			]",
	"			/value 11",
	"		}",
	"	}",
	"	/event-2 {",
	"		/useRulersIn1stQuadrant 0",
	"		/internalName (ai_plugin_swatches)",
	"		/localizedName [ 8",
	"			5377617463686573",
	"		]",
	"		/isOpen 0",
	"		/isOn 1",
	"		/hasDialog 1",
	"		/showDialog 0",
	"		/parameterCount 1",
	"		/parameter-1 {",
	"			/key 1835363957",
	"			/showInPalette 4294967295",
	"			/type (enumerated)",
	"			/name [ 13",
	"				44656c65746520537761746368",
	"			]",
	"			/value 3",
	"		}",
	"	}",
	"}"
	].join("\n");

	actionFile.open("w");
	actionFile.write(actionString);
	actionFile.close();
	
	//load the action
	app.loadAction(actionFile);
}