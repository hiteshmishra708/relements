import InfoIcon from 'icons/info.svg';
import UserSaysIcon from 'icons/user-says.svg';
import BotSaysIcon from 'icons/bot-says.svg';
import EntitiesIcon from 'icons/entities.svg';
import ConnectionsIcon from 'icons/connections.svg';
import ApiIcon from 'icons/api.svg';
import GearIcon from 'icons/gear.svg';
import CloseIcon from 'icons/close.svg';
import InactiveIcon from 'icons/inactive.svg';
import ActiveIcon from 'icons/active.svg';
import EditIcon from 'icons/edit.svg';
import InvisibleIcon from 'icons/invisible.svg';
import VisibleIcon from 'icons/visible.svg';
import SaveIcon from 'icons/save.svg';
import HelpIcon from 'icons/help.svg';
import AddIcon from 'icons/add.svg';
import TrashIcon from 'icons/trash.svg';
import HomeIcon from 'icons/home.svg';
import SynonymHighlightIcon from 'icons/synonym-highlight.svg';
import SynonymDuplicateIcon from 'icons/synonym-duplicate.svg';
import PlusIcon from 'icons/plus.svg';
import Plus2Icon from 'icons/plus2.svg';
import MinusIcon from 'icons/minus.svg';
import AddDelayIcon from 'icons/add-delay.svg';
import AddEntityIcon from 'icons/add-entity.svg';
import BotSaysColoredIcon from 'icons/bot-says-colored.svg';
import DelayIcon from 'icons/delay.svg';
import EntityIcon from 'icons/entity.svg';
import EntityNumericRangeIcon from 'icons/entity-numeric-range.svg';
import EntityRegexIcon from 'icons/entity-regex.svg';
import BudgetIcon from 'icons/budget.svg';
import DateIcon from 'icons/date.svg';
import TimeIcon from 'icons/time.svg';
import ReorderIcon from 'icons/reorder.svg';
import MandatoryIcon from 'icons/mandatory.svg';
import TickIcon from 'icons/tick.svg';
import StarIcon from 'icons/star.svg';
import AngleDownIcon from 'icons/angle-down.svg';
import NodeIcon from 'icons/node.svg';
import StoryIcon from 'icons/story.svg';
import UploadIconIcon from 'icons/upload-icon.svg';
import TaskIcon from 'icons/task.svg';
import TaskGreyIcon from 'icons/task-grey.svg';
import TaskboxIcon from 'icons/taskbox.svg';
import OutlierIcon from 'icons/outlier.svg';
import BusinessIcon from 'icons/business.svg';
import BotbreakIcon from 'icons/botbreak.svg';
import BotIcon from 'icons/bot.svg';
import CheckmarkIcon from 'icons/checkmark.svg';
import EntityEmailIcon from 'icons/entity-email.svg';
import ClientIcon from 'icons/client.svg';
import SearchIcon from 'icons/search.svg';
import FilterIcon from 'icons/filter.svg';
import FilterFilledIcon from 'icons/filter_filled.svg';
import TransferIcon from 'icons/transfer.svg';
import EmptyBusinessPlaceholderIcon from 'icons/empty-business-placeholder.svg';
import RedExclamationIcon from 'icons/red-exclamation.svg';
import TickGreenIcon from 'icons/tick-green.svg';
import QuestionIcon from 'icons/question.svg';
import QuestionBlueIcon from 'icons/question-blue.svg';
import QuestionBookIcon from 'icons/question-book.svg';
import ArrowIcon from 'icons/arrow.svg';
import TestBotIcon from 'icons/test-bot.svg';
import SubstoryEmptyIcon from 'icons/substory-empty.svg';
import QuotesOpenIcon from 'icons/quotes_open.svg';
import QuotesCloseIcon from 'icons/quotes_close.svg';
import TemplateIcon from 'icons/template.svg';
import TemplateGeneralIcon from 'icons/template_general.svg';
import TemplateSubstoryIcon from 'icons/template_substory.svg';
import TemplateSubstoryApiIcon from 'icons/template_substory_api.svg';
import CircleMoreIcon from 'icons/circle-more.svg';
import PasteIcon from 'icons/paste.svg';
import HaptikIcon from 'icons/haptik.svg';
import ProfileIcon from 'icons/profile.svg';
import ImagePlaceholder from 'icons/placeholder.svg';
import FilePlaceholder from 'icons/file_placeholder.svg';

import BotTabIcon from 'icons/botsTab.svg';
import BotTabColoredIcon from 'icons/botsTabColored.svg';
import TemplateTabIcon from 'icons/templatesTab.svg';
import TemplateTabColoredIcon from 'icons/templatesTabColored.svg';
import BusinessTabIcon from 'icons/businessTab.svg';
import BusinessTabColoredIcon from 'icons/businessTabColored.svg';
import GridIcon from 'icons/grid.svg';
import AnalyticsIcon from 'icons/analytics.svg';


/**
 * Based on the icon identifier (string), it returns the 
 * icon component.
 * @export
 * @param {string} iconType icon identifier
 * @returns {Object} the react component corresponding to the iconType
 */
export function getIcon(iconType) {
  switch (iconType) {
    case 'info':
      return InfoIcon;
    case 'user-says':
      return UserSaysIcon;
    case 'bot-says':
      return BotSaysIcon;
    case 'entities':
      return EntitiesIcon;
    case 'connections':
      return ConnectionsIcon;
    case 'api':
      return ApiIcon;
    case 'gear':
      return GearIcon;
    case 'close':
      return CloseIcon;
    case 'inactive':
      return InactiveIcon;
    case 'active':
      return ActiveIcon;
    case 'edit':
      return EditIcon;
    case 'invisible':
      return InvisibleIcon;
    case 'visible':
      return VisibleIcon;
    case 'save':
      return SaveIcon;
    case 'help':
      return HelpIcon;
    case 'add':
      return AddIcon;
    case 'trash':
      return TrashIcon;
    case 'home':
      return HomeIcon;
    case 'synonym_highlight':
      return SynonymHighlightIcon;
    case 'synonym_duplicate':
      return SynonymDuplicateIcon;
    case 'plus':
      return PlusIcon;
    case 'plus2':
      return Plus2Icon;
    case 'minus':
      return MinusIcon;
    case 'add-delay':
      return AddDelayIcon;
    case 'add-entity':
      return AddEntityIcon;
    case 'bot-says-colored':
      return BotSaysColoredIcon;
    case 'delay':
      return DelayIcon;
    case 'entity':
      return EntityIcon;
    case 'entity-numeric-range':
      return EntityNumericRangeIcon;
    case 'entity-regex':
      return EntityRegexIcon;
    case 'budget':
      return BudgetIcon;
    case 'date':
      return DateIcon;
    case 'time':
      return TimeIcon;
    case 'reorder':
      return ReorderIcon;
    case 'mandatory':
      return MandatoryIcon;
    case 'tick':
      return TickIcon;
    case 'star':
      return StarIcon;
    case 'angle-down':
      return AngleDownIcon;
    case 'node':
      return NodeIcon;
    case 'story':
      return StoryIcon;
    case 'upload_icon':
      return UploadIconIcon;
    case 'task':
      return TaskIcon;
    case 'task_gray':
      return TaskGreyIcon;
    case 'taskbox':
      return TaskboxIcon;
    case 'outlier':
      return OutlierIcon;
    case 'business':
      return BusinessIcon;
    case 'botbreak':
      return BotbreakIcon;
    case 'bot':
      return BotIcon;
    case 'checkmark':
      return CheckmarkIcon;
    case 'entity-email':
      return EntityEmailIcon;
    case 'client':
      return ClientIcon;
    case 'search':
      return SearchIcon;
    case 'filter':
      return FilterIcon;
    case 'filter_filled':
      return FilterFilledIcon;
    case 'transfer':
      return TransferIcon;
    case 'empty-business-placeholder':
      return EmptyBusinessPlaceholderIcon;
    case 'error_response':
      return RedExclamationIcon;
    case 'success_response':
      return TickGreenIcon;
    case 'tick-green':
      return TickGreenIcon;
    case 'question':
      return QuestionIcon;
    case 'question-blue':
      return QuestionBlueIcon;
    case 'question-book':
      return QuestionBookIcon;
    case 'arrow':
      return ArrowIcon;
    case 'test-bot':
      return TestBotIcon;
    case 'substory-empty':
      return SubstoryEmptyIcon;
    case 'quotes_open':
      return QuotesOpenIcon;
    case 'quotes_close':
      return QuotesCloseIcon;
    case 'template':
      return TemplateIcon;
    case 'template_general':
      return TemplateGeneralIcon;
    case 'template_substory':
      return TemplateSubstoryIcon;
    case 'template_substory_api':
      return TemplateSubstoryApiIcon;
    case 'circle-more':
      return CircleMoreIcon;
    case 'paste':
      return PasteIcon;
    case 'haptik':
      return HaptikIcon;
    case 'profile':
      return ProfileIcon;
    case 'botTab':
      return BotTabIcon;
    case 'botTabColored':
      return BotTabColoredIcon;
    case 'templateTab':
      return TemplateTabIcon;
    case 'templateTabColored':
      return TemplateTabColoredIcon;
    case 'businessTab':
      return BusinessTabIcon;
    case 'businessTabColored':
      return BusinessTabColoredIcon;
    case 'grid':
      return GridIcon;
    case 'imagePlaceholder':
      return ImagePlaceholder;
    case 'filePlaceholder':
      return FilePlaceholder;
    case 'analytics':
      return AnalyticsIcon;
    default:
      return null;
  }
}