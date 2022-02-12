import LayoutMenu from '@/components/LayoutMenu'
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'
import Breadcrumb from '@/components/Breadcrumb'
import Chart from '@/components/Chart'
import Cropper from '@/components/Cropper'
import CropperModal from '@/components/CropperModal'
import Editor from '@/components/Editor'
import FormTable from '@/components/FormTable'
import Filter from '@/components/Filter/Filter'
import LayoutHeader from '@/components/LayoutHeader'
import MultiTab from '@/components/MultiTab'
import SearchBar from '@/components/SearchBar'
import UploadImage from '@/components/Upload/UploadImage'

export default {
    install(app) {
        app.component('XLayoutMenu', LayoutMenu)
        app.component('XActionBar', ActionBar)
        app.component('XActionButton', ActionButton)
        app.component('XBreadcrumb', Breadcrumb)
        app.component('XChart', Chart)
        app.component('XCropper', Cropper)
        app.component('XCropperModal', CropperModal)
        app.component('XEditor', Editor)
        app.component('XFormTable', FormTable)
        app.component('XFilter', Filter)
        app.component('XLayoutHeader', LayoutHeader)
        app.component('XMultiTab', MultiTab)
        app.component('XSearchBar', SearchBar)
        app.component('XUploadImage', UploadImage)
        return app
    }
}
