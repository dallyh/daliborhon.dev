export function extractFileNameAndExtension(filePath: string) {
	// Using the lastIndexOf method to find the last occurrence of '/'
	const lastSlashIndex = filePath.lastIndexOf("/");

	// Using the substring method to extract the file name and extension
	const fileNameAndExtension = filePath.substring(lastSlashIndex + 1);

	// Using the lastIndexOf method to find the last occurrence of '.'
	const lastDotIndex = fileNameAndExtension.lastIndexOf(".");

	// Using the substring method to separate file name and extension
	const fileName = fileNameAndExtension.substring(0, lastDotIndex);
	const fileExtension = fileNameAndExtension.substring(lastDotIndex + 1);

	return {
		name: fileName,
		ext: fileExtension,
	};
}
