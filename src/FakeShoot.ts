/// <reference path="headers.ts" />
const FakeShootId = "shoot";
SoundPool.registerSound(FakeShootId, {
	source: FOLDER_SOUNDS + "shoot.ogg",
	type: SoundAPI.Type.SOUND
});

Callback.addCallback("ItemUseLocalServer", (coords: Vector, item: ItemInstance) => {
	if (item.id != 280) return;

	const pos: Position = { ...coords, dimension: Player.getDimension() };

	SoundPool.select(FakeShootId)
		.at(pos)
		.play();
})
