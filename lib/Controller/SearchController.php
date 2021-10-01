<?php
namespace OCA\NCDownloader\Controller;

use OCA\NCDownloader\Search\torrentSearch;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class SearchController extends Controller
{
    private $userId;
    private $settings = null;
    //@config OC\AppConfig
    private $l10n;

    public function __construct($appName, IRequest $request, $UserId)
    {
        parent::__construct($appName, $request);
        $this->appName = $appName;
        $this->uid = $UserId;
        $this->urlGenerator = \OC::$server->getURLGenerator();
        $this->search = new torrentSearch();
    }
   /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function execute()
    {
        $keyword = trim($this->request->getParam('form_input_text'));
        $site = trim($this->request->getParam('select-value-search'));
        $this->search->setSite($site);
        $data = $this->search->go($keyword);
        $resp['title'] = ['title', 'seeders', 'info', 'actions'];
        $resp['row'] = $data;
        return new JSONResponse($resp);
    }

}
