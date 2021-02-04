/**
 * Layer Container
 */
export interface LayerInterface {

	focus(): this;

	/**
	 * Minimum size by option
	 */
	minimize();

	/**
	 * Maximum size by client
	 */
	maximize();

	/**
	 * Resize to Minimize or Maximize
	 */
	resize();

	/**
	 * Close Layer
	 */
	close();
}
