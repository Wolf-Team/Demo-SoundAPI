/// <reference path="headers.ts" />

const FakeShootId = MOD_ID + ".shoot";
SoundAPI.registerSound(FakeShootId, {
	source: FOLDER_SOUNDS + "shoot.ogg"
});

Callback.addCallback("ItemUseLocalServer", (coords: Vector, item: ItemInstance) => {
	if (item.id != 280) return;

	const pos: Position = { ...coords, dimension: Player.getDimension() };

	SoundAPI.select(FakeShootId)
		.at(pos)
		.play();
})
